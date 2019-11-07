'use strict';

const qs = require('qs');
const sequelize = require('sequelize');
const sequelizeQuerystring = require('../index');

const querystring = `deletedAt=null&status=1\
&where={"$or":[{"createdAt":{"$between":["20191105","20191106"]}},{"updatedAt":{"$between":["20191107","20191108"]}}]}\
&order[]=["createdAt","desc"]\
&order[]=["updatedAt","asc"]\
&offset=10&limit=20`

const query = qs.parse(querystring);
const result = sequelizeQuerystring(sequelize, query);

console.log(result);
