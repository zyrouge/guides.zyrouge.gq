---
title: Rank card using canvas
description: How to create a awesome rank card using only canvas!
---

## Preview

Output:

<img src="https://media.discordapp.net/attachments/706710007441260595/719947058047352862/rank.png">

!!! warning
    The above using a different font

<br>

Base:

<img src="/assets/images/discord-js-rank-card.png">

---

## Alternative

If you are a beginner, you can use [canvacord](https://www.npmjs.com/package/canvacord) to do this!

```bash
$ npm install canvacord
```

!!! info
    Canvacord has the same code below!

---

## Installing Canvas

Open your command prompt (or) powershell and run the following command.

```bash
$ npm install canvas
```

---

## Creating a canvas

Creating a new canvas to begin the rank card!

```javascript
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(934, 282); // Use this measurement if you are using the card in this tutorial
const ctx = canvas.getContext("2d");
```

---

## Rank Card base

You can use the base picture used in this tutorial or make your own one!

```javascript
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(934, 282);
const ctx = canvas.getContext("2d");

const rankCard = await Canvas.loadImage("https://zyrouge.gq/assets/images/others/discord-js-rank-card.png");
ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);

const font = "Arial"; // Default font
```

---

## Username

Now lets write the username on the card

```javascript
ctx.font = `bold 36px ${font}`; // Weight - Bold, Size - 36px
ctx.fillStyle = "#FFFFFF"; // Color in hex value
ctx.textAlign = "start"; // Position of text starting
const name = username > 7 ? username.substring(0, 7).trim() + '...' : username; // Shorten name if its long
ctx.fillText(`${name}`, 264, 164); // Writing the username
```

---

## Discrim

Writing Discriminator (`#0950`) in the card

```javascript
ctx.font = `36px ${font}`; // Weight - Normal
ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // Reducing opacity using rgba
ctx.textAlign = "start";
if(discrim) ctx.fillText(`#${discrim}`, ctx.measureText(name).width + 10 + 316, 164); // Writing discrim
```

---

## Level

Writing the Level of the user in the card

```javascript
ctx.font = `bold 36px ${font}`;
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = "end";
ctx.fillText(level, 934 - 64, 82); // const level = level of the user
ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(level).width - 16, 82); // Writing "LEVEL"
```

---

## Rank

Writing the Rank (`#10`) of the user in the card

```javascript
ctx.font = `bold 36px ${font}`;
ctx.fillStyle = "#ffffff";
ctx.textAlign = "end";
ctx.fillText(rank, 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82); // const rank = rank of the user
ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
ctx.fillText("RANK", 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(rank).width - 16, 82); // Writing "RANK"
```

---

## Writing Current and Needed EXP

You must calculate proper value of current experience points and the maximum expirence point of the current level. This is also needed for progress bar in the card.

```javascript
ctx.font = `bold 36px ${font}`;
ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
ctx.textAlign = "start";
ctx.fillText("/ " + neededXP, 624 + ctx.measureText(currentXP).width + 10, 164);
ctx.fillStyle = "#ffffff";
ctx.fillText(currentXP, 624, 164);
```

---

## Progress bar

This is the most complex part of the entire rank card. This might be tricky but everything is possible.

```javascript
ctx.beginPath();
ctx.fillStyle = "#424751";
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "#ffffff";
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();
```

!!! info
    If your bar exceeds the bar graph, add the below code before making the progress bar.

```javascript
let widthXP = (currentXP * 615) / neededXP;
if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;
```

---

## Avatar

Finally drawing the avatar of the user

```javascript
const avatar = await Canvas.loadImage(avatarURLoftheUser);
ctx.drawImage(avatar, 85, 66, 150, 150);
```

!!! info
    If you want a circle avatar you can clip the path before drawing the avatar!

---

## Getting the Buffer

```javascript
const card = canvas.toBuffer();
```

---
## Full Code


```javascript
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(934, 282);
const ctx = canvas.getContext("2d");

const rankCard = await Canvas.loadImage("https://zyrouge.gq/assets/images/others/discord-js-rank-card.png");
ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);

const font = "Arial";

ctx.font = `bold 36px ${font}`;
ctx.fillStyle = "#FFFFFF";
ctx.textAlign = "start";
const name = username > 7 ? username.substring(0, 7).trim() + '...' : username;
ctx.fillText(`${name}`, 264, 164);

ctx.font = `36px ${font}`;
ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
ctx.textAlign = "center";
if(discrim) ctx.fillText(`#${discrim}`, ctx.measureText(name).width + 10 + 316, 164);

ctx.font = `bold 36px ${font}`;
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = "end";
ctx.fillText(level, 934 - 64, 82);
ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(level).width - 16, 82);

ctx.font = `bold 36px ${font}`;
ctx.fillStyle = "#ffffff";
ctx.textAlign = "end";
ctx.fillText(rank, 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
ctx.fillText("RANK", 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(rank).width - 16, 82);

ctx.font = `bold 36px ${font}`;
ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
ctx.textAlign = "start";
ctx.fillText("/ " + neededXP, 624 + ctx.measureText(currentXP).width + 10, 164);
ctx.fillStyle = "#ffffff";
ctx.fillText(currentXP, 624, 164);

let widthXP = (currentXP * 615) / neededXP;
if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;

ctx.beginPath();
ctx.fillStyle = "#424751";
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "#ffffff";
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();

const avatar = await Canvas.loadImage(avatarURL);
ctx.drawImage(avatar, 85, 66, 150, 150);

const card = canvas.toBuffer();
```

---

## Other Examples

[Aurora](https://github.com/zyrouge/aurora-bot)'s rank card:

<img src="https://media.discordapp.net/attachments/594543235607822367/709288549882789899/rank_582836817305272320_521007613475946496.png">