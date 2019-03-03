## JSON Server UI
<img align="center" src="https://circleci.com/gh/mackness/JSON-Server-UI.svg?style=shield" />

![Alt Text](https://i.imgur.com/xQb9kSW.gif)

**This is an Electron applicaiton that serves as a UI for the awesome [JSON Server](https://github.com/typicode/json-server)**

### Get JSON Server UI
**[Download the latest release](https://github.com/mackness/JSON-Server-UI/releases/download/1.0.0-beta.0/Json.Server.UI.app.zip)** (macOS only)

TODO make available via homebrew

### Getting Started
This project uses [JSON Server v0.14.0](https://github.com/typicode/json-server) under the hood so you can expect everything that works with JSON Server to work with this UI. It's important to understand that JSON Server generates routes based on the top level properties in the `db.json` file. So given the following `db.json`:
```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
You can:
```
$ curl http://localhost:3000/posts/1
> {"id":1,"title":"json-server","author":"typicode"}
```

You can learn much more about JSON Server by reading the great [documentation](https://github.com/typicode/json-server#getting-started).

### Contributing
1) Fork the repository 
2) Clone your forked repository
3) Run `yarn` or `npm i` to install dependencies
4) Start client side build process with `yarn start:client`
5) Start the Electron process with `yarn start`
6) Make changes
7) Submit a PR against the master branch of this repository

### TODO
* Access logs
* Dispaly generated routes
* Unit tests for client and server code
* JSON validation in the UI
* Support for SSL
* Settings View
* Integrate with a fake data generator such as [Faker](https://github.com/Marak/faker.js), [Casual](https://github.com/boo1ean/casual), [Chance](https://github.com/victorquinn/chancejs) or [JSON Schema Faker](https://github.com/json-schema-faker/json-schema-faker)

### License

[CC0 1.0 (Public Domain)](LICENSE.md)
