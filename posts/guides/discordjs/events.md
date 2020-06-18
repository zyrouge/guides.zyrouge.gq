---
title: Events
description: Understanding Discord.JS events.
tags: discordjs, events
image: https://camo.githubusercontent.com/40129aa4640399b5e65cc3c101361a6a0b5d6467/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667
writtenAt: 18 Jun 2020 16:15
---

* Discord.JS triggers certain events when a `message` is sent or `ready` when the bot is ready.

!!! info
All the events can be referred here [https://discord.js.org/\#/docs/main/stable/class/Client](https://discord.js.org/#/docs/main/stable/class/Client)
!!!

---

## Creating Event Handlers

An Overview of using events.

```javascript
client.on('eventName', (args) => {
    // Handle the events here
});
```

---

## Example

Example of `messageDelete` event.

```javascript
client.on("messageDelete", (message) => {
   console.log(`Content: ${message.content}\nGuild: ${message.guild.name}\nAuthor: ${message.author.tag}\nChannel: ${message.channel.name}`);
});
```

