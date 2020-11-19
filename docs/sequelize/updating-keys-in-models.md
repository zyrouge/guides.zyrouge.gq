---
title: Updating a Key
description: How to update a key in Sequelize Model
---

## Updating a Key

* The `Async/Await` method

```javascript
const result = await database.update({ value: 2 }, { where: { key: "test" } });
console.log(result);
```

* The `.then` method

```javascript
database
    .update({ value: 2 }, { where: { key: "test" } })
    .then(result => console.log(result))
    .catch(console.error);
```

