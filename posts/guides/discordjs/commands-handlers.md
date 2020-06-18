---
title: Commands Handlers
description: Loads commands and run it with event handlers
tags: discordjs, command handlers
image: https://camo.githubusercontent.com/40129aa4640399b5e65cc3c101361a6a0b5d6467/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667
writtenAt: 18 Jun 2020 14:28
---

## Creating a Collection to store Commands and Aliases

* Open your `index.js`
* Put the below code in that

```javascript
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
```

---

## Creating a commands folder

* Create a folder `commands` in the directory
* Enter the below in `index.js`

```javascript
fs.readdir("./commands/", (error, files) => {
    if(error) console.error(error); // return if a error
    files.forEach(f => {
        if(!f.endsWith(".js")) return;
        let props = require(`./commands/${f}`); // require the file
        client.commands.set(props.help.name, props); // set the properties
        props.help.aliases.forEach(alias => client.aliases.set(alias, props.help.name)); // set the aliases
        console.log(`Loaded ${props.help.name} (${f})`);
    });
});
```

!!! info
Commands folder is read using `fs`  module.
!!!

---

## Creating message event

* Create a new file called `message.js` in `events` folder.
* Enter the below in `message.js`

```javascript
module.exports = async (client, message) => {
    if(message.author.bot) return; // return if the message is from a bot
    client.prefix = '!';
    if(message.content.indexOf(client.prefix) !== 0) return; // Check if there is the prefix at the start
    const args = message.content.split(/\s+/g); // Splits at spaces and converts to Array
    const command = args.shift().slice(client.prefix.length).toLowerCase(); // Slices the Command name from args and deletes the prefix from sliced name and changes to lowercase
    const cmd = client.commands.get(command); // Gets the Command Info
    if(!cmd) return; // Returns if there in no Command
    cmd.run(client, message, args); // Runs the module.exports.run function
};
```

