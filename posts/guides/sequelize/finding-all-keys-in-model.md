---
title: Finding all the Keys
description: How to find all the keys in a Sequelize Model
tags: zyrouge, sequelize
image: https://mherman.org/assets/img/blog/node-sequelize.png
writtenAt: 18 Jun 2020 16:35
---

#### Finding All

* The `Async/Await` method

```javascript
const result = await database.findAll();
console.log(result);
```

* The `.then()` method

```javascript
database.findAll()
    .then(result => console.log(result))
    .catch(console.error);
```

