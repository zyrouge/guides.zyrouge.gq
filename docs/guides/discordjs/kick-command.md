---
title: Kick command
description: Making a Kick Command using Discord.js
---

!!! info
    Check [this YouTube Video](https://youtu.be/KcIvHvB7LHo) to see this in real action!

## Base

```js
module.exports = {
    name: "kick",
    aliases: [],
    run: async () => {}
}
```

---

## Finding mentioned User or look for the ID

```js
module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        const [id, ...reason] = args; // Modern Deconstruction
        const member = message.mentions.members.first() || message.guild.members.cache.get(id);
        if(!member) return message.channel.send("Provide a User mention or ID to kick");
    }
}
```

---

## Checking if the member is kickable

```js
module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        const [id, ...reason] = args;
        const member = message.mentions.members.first() || message.guild.members.cache.get(id);
        if(!member) return message.channel.send("Provide a User mention or ID to kick");
        if(!member.kickable) return message.channel.send(`Cannot **kick** ${member}!`);
    }
}
```

---

## Kicking the member

```js
module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        const [id, ...reason] = args;
        const member = message.mentions.members.first() || message.guild.members.cache.get(id);
        if(!member) return message.channel.send("Provide a User mention or ID to kick");
        if(!member.kickable) return message.channel.send(`Cannot **kick** ${member}!`);

        member.kick(reason.join(" "))
        .then(() => {
            message.channel.send(`Kicked **${member.user.tag}**`);
        })
        .catch((err) => {
            message.channel.send(`Could not ban **${member.user.tag}**. Reason: \`${err}\``);
        });
    }
}
```

---

## Full Code

```js
module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        const [id, ...reason] = args;
        const member = message.mentions.members.first() || message.guild.members.cache.get(id);
        if(!member) return message.channel.send("Provide a User mention or ID to kick");
        if(!member.kickable) return message.channel.send(`Cannot **kick** ${member}!`);

        member.kick(reason.join(" "))
        .then(() => {
            message.channel.send(`Kicked **${member.user.tag}**`);
        })
        .catch((err) => {
            message.channel.send(`Could not ban **${member.user.tag}**. Reason: \`${err}\``);
        });
    }
}
```
