---
title: The Basics
description: Understanding the basics of ExpressJS
---

!!! info
    Check [this YouTube Video](https://youtu.be/qv2MjXvSLsw) to see this in real action!

## Installing

```bash
npm i express
```

## Creating a Server

```js hl_lines="2"
const express = require("express");
const app = express(); // Our Server
```

## Binding server to a Port

```js hl_lines="4"
const express = require("express");
const app = express();

app.listen(8080);
```

## The Basic Middlewares

To parse `json` body

```js
app.use(express.json());
```

To parse `urlencoded` body

```js
app.use(express.urlencoded({ extended: true }));
```

## Creating an endpoint

Making `http://localhost:8080/` to return something

```js
app.get("/", (req, res) => {
    res.send("Hello world!");
});
```

Now when we visit `http://localhost:8080/`, we get `Hello world!`!

## Sending JSON

```js hl_lines="2"
app.get("/", (req, res) => {
    res.json({ hello: "world" });
});
```

## Creating a POST endpoint

```js
app.post("/", (req, res) => {
    res.json(req.body);
});
```

`req.body` is available on all the `POST` requests! It can be a `json`, `xml` or someother thing.

!!! tip
    Use **Insomnia** or **Postman** to test any type of Requests!

## URL Parameters

Any word with `:` prefix is treated as an Parameter and can be access by `req.params[param_name]`.

```js hl_lines="1 2"
app.get("/users/:user", (req, res) => {
    const name = req.params.user;
    if (!name) return res.send("No User");
    res.json({ name });
});
```

## URL Queries

They can be accessed using `req.query[query_name]`.

```js
app.get("/search", (req, res) => {
    const term = req.params.term;
    if (!term) return res.send("No Search term");
    res.send(`Search term is ${term}`);
});
```