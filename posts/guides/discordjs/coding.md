---
title: Coding Discord Bot using discord.js
description: How to use discord.js to run a bot
tags: discordjs
image: https://camo.githubusercontent.com/40129aa4640399b5e65cc3c101361a6a0b5d6467/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667
writtenAt: 18 Jun 2020 14:28
---

## Creating Main File

* Create a file named `index.js` in the main directory.
* I recommend using a IDE like Visual Studio Code or others like Atom, IDEA for easy programming.

---

## Creating Client in the Main File

```javascript
const Discord = require("discord.js");
const client = Discord.Client();
```

---

## Login in the bot

* Now we have created the bot but its not yet online.
* Lets make it login using the Token.

```javascript
const Discord = require("discord.js");
const client = Discord.Client();

client.login('PUTYOURTOKENHERE');
```

!!! danger
Never revealed your Token to anyone!
!!!

---

## Running the Code

* Enter this in CMD to run the project.

```bash
$ node index.js
```

!!! info
Now the Bot is Online! YAY
!!!
