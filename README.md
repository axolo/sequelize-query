# Sequelize Query

Generate [Sequelize] [querying] options by program, querystring, http or curl.

Convert Sequelize operators `Aliases` to Sequelize operators `Symbol`.

|   Alias    |          Symbol          |
| ---------- | ------------------------ |
| `$or`      | `[Sequelize.Op.or]`      |
| `$and`     | `[Sequelize.Op.and]`     |
| `$ne`      | `[Sequelize.Op.ne]`      |
| `$between` | `[Sequelize.Op.between]` |
| ...        | ...                      |

## install

```bash
npm install @axolo/sequelize-query --save
```

## test

```bash
npm run test
```

> use by program see in [test](./test/index.js)

## API

> **WARNING**: only support version >= 0.1.0

```text
sequelizeQuery(query, params = {})
```

### parameters

|       Name        |  Type  | Required |              Description               |
| ----------------- | ------ | :------: | -------------------------------------- |
| query             | Object |   true   | query (where with alias) for convert   |
| params.sequelize  | Object |          | Sequelize instance, default to builtin |
| params.options    | Object |          | Sequelize querying options             |
| params.keys       | Object |          | omit values of keys in where           |
| params.excludeOps | Array  |          | omit Sequelize Op alias                |

> default to `options`

```js
{
  offset: 0,
  limit: 1000,
}
```


> default to `keys`

```js
{
  include: 'include',
  where: 'where',
  order: 'order',
  offset: 'offset',
  limit: 'limit',
}
```

> default to `excludeOps`

```js
[]
```

### return

|  Type  |                   Description                    |
| ------ | ------------------------------------------------ |
| Object | Sequelize querying options with operators Symbol |

## usage

A example of [Egg.js] at `/app/controller/user.js` by [RESTful] style router.

### controller

```js
'use strict';

const qs = require('qs');
const sequelizeQuery = require('@axolo/sequelize-query');
const Controller = require('egg').Controller;

class SequelizeQueryController extends Controller {

  async index() {
    const { app, ctx } = this;
    const { querystring } = ctx.request;
    const query = qs.parse(querystring);
    const options = sequelizeQuery(query, {
      sequelize: app.Sequelize,
      logging: console.log,
      distinct: true,
      subQuery: false,
    });
    const user = await ctx.model.User.findAll(options);
    ctx.body = user;
  }

  async create() {
    const { app, ctx } = this;
    const { body } = ctx.request;
    const options = sequelizeQuery(body, {
      sequelize: app.Sequelize,
      logging: console.log,
    });
    const user = await ctx.model.User.findAll(options);
    ctx.body = user;
  }

}

module.exports = SequelizeQueryController;
```

### request

#### GET

```text
/user?where={"username":{"$like":"%25ming%25"}}&limit=5&order=[["createdAt","desc"],["updatedAt","asc"]]
```

> **MUST** [encodeURIComponent] querystring by url

#### POST

```bash
curl -X POST '/user' \
-H 'Content-Type: application/json' \
-d '{
  "where": { "username": { "$like": "%ming%" } },
  "order": [[ "createdAt", "desc" ], ["updatedAt", "asc" ]],
  "limit": 5
}'
```

### response

```json
[
  {
    "id": "e54160d0-ffa3-11e9-961a-013b0b64d1f2",
    "username": "yueming",
    "password": "password",
    "status": 0,
    "createdAt": "2019-11-05T08:11:40.000Z",
    "updatedAt": "2019-11-05T08:11:40.000Z",
    "deletedAt": null
  }
]
```

### SQL

> SQL from Sequelize

```sql
SELECT `id`, `username`, `password`, `status`, `createdAt`, `updatedAt`, `deletedAt`
FROM `user` AS `user`
WHERE (`user`.`deletedAt` IS NULL AND `user`.`username` LIKE '%ming%')
ORDER BY `user`.`createdAt` DESC, `user`.`updatedAt` ASC
LIMIT 0, 5;
```

[Sequelize]: https://sequelize.org/
[querying]: https://sequelize.org/master/manual/querying.html
[encodeURIComponent]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
[Egg.js]: https://github.com/eggjs/egg
[RESTful]: https://eggjs.org/en/basics/router.html#restful-style-url-definition
