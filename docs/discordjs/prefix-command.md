---
title: Prefix command
description: Making a Custom Prefix Command in Discord.js
---

!!! info
    Check [this YouTube Video](https://youtu.be/PA488zqtYLE) to see this in real action!

## Base

```js
module.exports = {
    name: "prefix",
    aliases: ["pre"],
    run: async () => {}
}
```

## Installing database packages

```bash
npm i keyvify better-sqlite
```

!!! info
    You can use other dialects like Mongodb, Postgres. Check out `Keyvify` docs.

## Setting up Database

In main file (`index.js`)

```js
client.database = Keyvify("guilddatabase", {
    dialect: "better-sqlite",
    storage: `${__dirname}/data/database.sqlite`
});
```

## Connecting to database when bot is ready

```js
client.on('ready', async () => {
    console.log('I am ready!');
    await client.database.connect();
});
```

## Getting Prefix from Database

```js
module.exports = {
    name: "prefix",
    aliases: ["pre"],
    run: async (client, message, args) => {
        const nPrefix = args[0]; // Checks if user specified new prefix
        const pPrefix = (await client.database.get(message.guild.id)).value || {};
        if (!nPrefix) return message.channel.send(`Prefix: \`${pPrefix.prefix || client.prefix}\``);
    }
}
```

## Setting new prefix in the Database

```js
module.exports = {
    name: "prefix",
    aliases: ["pre"],
    run: async (client, message, args) => {
        const nPrefix = args[0];
        const pPrefix = (await client.database.get(message.guild.id)).value || {};
        if (!nPrefix) return message.channel.send(`Prefix: \`${pPrefix.prefix || client.prefix}\``);
        await client.database.set([message.guild.id, "prefix"], nPrefix);
        message.channel.send(`Prefix changed to \`${nPrefix}\``);
    }
}
```

## Checking for Custom Prefix

```js hl_lines="3 4"
client.on('message', async (message) => {
    if (message.author.bot) return;
    const gConfig = (await client.database.get(message.guild.id)).value || {};
    const prefix = gConfig.prefix || client.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (cmd) cmd.run(client, message, args);
});
```

## Full Code

Main file (`index.js`)

```js hl_lines="10 11 12 13 17 36 37"
const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const { Keyvify } = require("keyvify");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = ",";
client.database = Keyvify("guilddatabase", {
    dialect: "better-sqlite",
    storage: `${__dirname}/data/database.sqlite`
});

client.on('ready', async () => {
    console.log(`I am ready!`);
    await client.database.connect();
});

const init = async () => {
    fs.readdir(`./commands`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const props = require(`./commands/${file}`);
            client.commands.set(props.name, props);
            props.aliases.forEach(alias => client.aliases.set(alias, props.name));
            console.log(`Loaded ${file}`);
        })
    });
};

init();

client.on('message', async (message) => {
    if (message.author.bot) return;
    const gConfig = (await client.database.get(message.guild.id)).value || {};
    const prefix = gConfig.prefix || client.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (cmd) cmd.run(client, message, args);
});

client.login(token);
```

Prefix Command File (`commands/prefix.js`)
```js
module.exports = {
    name: "prefix",
    aliases: ["pre"],
    run: async (client, message, args) => {
        const nPrefix = args[0];
        const pPrefix = (await client.database.get(message.guild.id)).value || {};
        if (!nPrefix) return message.channel.send(`Prefix: \`${pPrefix.prefix || client.prefix}\``);
        await client.database.set([message.guild.id, "prefix"], nPrefix);
        message.channel.send(`Prefix changed to \`${nPrefix}\``);
    }
}
```