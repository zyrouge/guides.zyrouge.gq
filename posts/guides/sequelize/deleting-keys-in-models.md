---
title: Deleting a Key
description: How to delete a key in Sequelize Model
tags: zyrouge, sequelize
image: https://mherman.org/assets/img/blog/node-sequelize.png
writtenAt: 18 Jun 2020 16:35
---

## Deleting a Key

* The `Async/Await` method

```javascript
const result = await database.destroy({ where: { key: "test" } });
console.log(result);
```

* The `.then()` method

```javascript
database
    .destroy({ where: { key: "test" } })
    .then(result => console.log(result))
    .catch(console.error);
```

