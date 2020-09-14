---
title: Events Handlers
description: Making a simple Events handler
---

## Event Handler

* Create a new folder called `events` in the directory.
* Enter the below in `index.js`

```javascript
const fs = require("fs"); // Using an inbuilt module to read files in a folder
fs.readdir("./events/", (error, files) => {
    if(error) console.error(error); // log of an error if found
    files.forEach(f => {
        if(!f.endsWith(".js")) return; // checks if the file ends with .js extension
        const event = require(`./events/${f}`); // event file. Example: message.js
        let file = f.split(".")[0]; // getting the file name a.k.a. event name
        client.on(file, event.bind(null, client)); // binding vars
        delete require.cache[require.resolve(`./events/${file}`)]; // deleting the cache after triggering the event
    });
});
```

---

## Handling ready event

* Create a new file called `ready.js` in `events` folder.
* Enter the below in `ready.js`

```javascript
module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
};
```



