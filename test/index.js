'use strict';

const qs = require('qs');
const sequelize = require('sequelize');
const sequelizeQuery = require('../src/index');

const querystring = `access_token=TOKEN\
&deletedAt=null&status=1\
&where={"$or":[{"createdAt":{"$between":["20191105","20191106"]}},\
{"updatedAt":{"$between":["20191107","20191108"]}}]}\
&order[]=["createdAt","desc"]\
&order[]=["updatedAt","asc"]\
&offset=10&page_size=20`

const query = qs.parse(querystring);
const options = { loggin: console.log };
const keys = {
  limit: 'page_size',
  accessToken: 'access_token'
};
const result = sequelizeQuery(sequelize, query, options, keys);

console.log(result);
