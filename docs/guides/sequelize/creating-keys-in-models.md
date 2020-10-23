---
title: Creating a Key
description: How to create a Key in Sequelize Model=
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

