const config = require("../config");
const { logger, parser: markdownRenderer, renderer: HTMLRenderer } = require("./utils");
const fs = require("fs");
const fsp = fs.promises;
const nodepath = require("path");
const chalk = require("chalk");
const util = require("util");
const cloner = util.promisify(require('ncp').ncp);
const rimraf = require("rimraf");

const rootDir = nodepath.join(__dirname, "..");
const inDir = nodepath.resolve(config.inDir);
const outDir = createDirIfDoesnt(`${rootDir}/${config.outDir}`);
const templatesDir = nodepath.resolve(config.templatesDir);
const assetsDir = nodepath.resolve(config.assetsDir);
const defaultsDir = nodepath.resolve(config.defaultsDir);
const routesArray = [];

const prettifyDir = (path) => (chalk.gray(path.replace(new RegExp("/", "g"), "\\")));

const formatDir = (path) => (path.replace(inDir, ""));

const firstDir = (path) => (path.split("/").filter(x => x).shift());

const lastDir = (path) => (path.split("/").filter(x => x).pop());

const isDir = async (path) => (await (await fsp.lstat(path)).isDirectory());

const formatName = (_name_) => {
    const name = _name_.split(".")[0];
    return (name && name.toLowerCase() === "readme" ? "index" : name);
}

const buildCleaner = () => (new Promise(async (resolve, reject) => {
    rimraf(outDir + "/*", {}, (error) => {
        if (error) reject(error);
        else resolve();
    });
}));

const cache = new Map();
const cacheLoader = (path) => (new Promise(async (resolve, reject) => {
    logger.debug(`Processing Templates in ${prettifyDir(path)}`);
    const templatesHTML = await fsp.readdir(path);
    for (const template of templatesHTML) {
        const templateContent = await fsp.readFile(nodepath.resolve(path, template), "UTF8");
        cache.set(template.split(".")[0], templateContent);
        logger.debug(`Cached Templates in ${prettifyDir(path)}`);
    }
    resolve();
}));

const assetsLoader = (path) => (new Promise(async (resolve, reject) => {
    logger.debug(`Processing Assets in ${prettifyDir(path)}`);
    await cloner(path, nodepath.join(outDir, "assets"));
    logger.debug(`Cloned Assets from ${prettifyDir(path)}`);
    resolve();
}));

const defaultsLoader = (path) => (new Promise(async (resolve, reject) => {
    logger.debug(`Processing Defaults in ${prettifyDir(path)}`);
    await cloner(path, nodepath.join(outDir, ""));
    logger.debug(`Cloned Defaults from ${prettifyDir(path)}`);
    resolve();
}));

function createDirIfDoesnt(path) { if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true }); return path; }
function createFileIfDoesnt (path) { fs.closeSync(fs.openSync(path, 'w')); return path; }
function formatRoute (path) { return path && path.toLowerCase() === "index" ? "" : path + ".html" }

const fileHandler = (folder, file, path) => (new Promise(async (resolve, reject) => {
    logger.debug(`Processing File - ${prettifyDir(path)}`);
    const saveFileName = formatName(file);
    const parsedMarkdown = await fsp.readFile(path, { encoding: "UTF8" });
    const env = {};
    const renderedMarkdown = await markdownRenderer(parsedMarkdown, env);
    const templateName = lastDir(folder);
    const altTemplateName = firstDir(folder);
    const template = cache.get(templateName) || cache.get(altTemplateName) || cache.get("base");
    if (!template) return logger.error(`No template was found for ${chalk.red(templateName)} - ${prettifyDir(path)}`);
    const renderedHTML = await HTMLRenderer({ template, content: renderedMarkdown, divID: config.contentDivID, navbar: cache.get(config.navbar.file), footer: cache.get(config.footer.file), config });
    const saveFileFolder = await createDirIfDoesnt(nodepath.join(outDir, folder));
    const saveFilePathJoined = nodepath.join(saveFileFolder, saveFileName + ".html");
    const saveFilePath = createFileIfDoesnt(saveFilePathJoined);
    await fsp.writeFile(saveFilePath, renderedHTML, { encoding: "UTF8" });
    const saveJSONPathJoined = nodepath.join(saveFileFolder, saveFileName + ".json");
    const saveJSONPath = createFileIfDoesnt(saveJSONPathJoined);
    const filteredJSON = { ...renderedMarkdown, env: null };
    await fsp.writeFile(saveJSONPath, JSON.stringify(filteredJSON), { encoding: "UTF8" });
    routesArray.push({
        ...renderedMarkdown.meta,
        route: `${folder}/${formatRoute(saveFileName)}`,
        path: saveFilePathJoined
    });
    logger.debug(`Processed File - ${prettifyDir(path)}`);
    resolve();
}));

const folderHandler = (path) => (new Promise(async (resolve, reject) => {
    logger.debug(`Processing Folder - ${prettifyDir(path)}`);
    const routes = await fsp.readdir(path);
    for (const route of routes) {
        const routePath = `${path}/${route}`;
        if (await isDir(routePath)) await folderHandler(routePath);
        else await fileHandler(formatDir(path), route, routePath);
    }
    resolve();
    logger.debug(`Processed Folder - ${prettifyDir(path)}`);
}));

const writeRoutes = (routes) => (new Promise(async (resolve, reject) => {
    logger.debug(`Writing ${chalk.grey("routes.json")}`);
    const routesFilePath = createFileIfDoesnt(nodepath.join(outDir, config.assetsDir, "routes.json"));
    await fsp.writeFile(routesFilePath, JSON.stringify(routes), "UTF8");
    logger.debug(`Written routes in ${prettifyDir(routesFilePath)}`);
    resolve();
}));

const generator = async () => {
    const startTime = Date.now();
    logger.info(`Generating Static files...`);
    await buildCleaner();
    await cacheLoader(templatesDir);
    await assetsLoader(assetsDir);
    await defaultsLoader(defaultsDir);
    await folderHandler(inDir);
    await writeRoutes(routesArray);
    logger.success(`Generated static files in ${prettifyDir(`${rootDir}/${config.outDir}`)}`);
    logger.info(`Completed in ${chalk.blue(Date.now() - startTime)} ms`);
}

module.exports = generator;