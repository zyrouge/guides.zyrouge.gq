---
title: Creating a Key
description: How to create a Key in Sequelize Model
tags: zyrouge, sequelize
image: https://mherman.org/assets/img/blog/node-sequelize.png
writtenAt: 18 Jun 2020 16:35
---

## Creating a Key

* The `Async/Await` method

```javascript
const result = await database.create({ key: "test", value: 1 });
console.log(result);
```

* The `.then()` method

```javascript
database
    .create({ key: "test", value: 1 })
    .then((result) => console.log(result))
    .catch(console.error);
```

