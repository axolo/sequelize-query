# Sequelize Query

Get [Sequelize] [querying] options by program, querystring or http.

Convert sequelize operators Aliases to sequelize operators Symbol.

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
# or use Yarn
yarn add @axolo/sequelize-query
```

## usage

### request

#### querystring

```text
/user?where={"username":{"$like":"%25ming%25"}}&limit=5&order=[["createdAt","desc"],["updatedAt","asc"]]
```

> **MUST** [encodeURIComponent] querystring by url

#### http post

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

### get SQL by Sequelize

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
