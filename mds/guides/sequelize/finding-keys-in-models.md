---
title: Finding a Key
description: How to find a specific key in the Database
tags: zyrouge, sequelize
image: https://mherman.org/assets/img/blog/node-sequelize.png
writtenAt: 18 Jun 2020 16:35
---

## Finding only One

* The `Async/Await` method

```javascript
const result = await database.findOne({ where: { key: "test" } });
console.log(result);
```

<br>

* The `.then` method

```javascript
database
    .findOne({ key: "test" })
    .then((result) => console.log(result))
    .catch(console.error);
```

!!! info
    Many Parameters can be specified in `where` options.
