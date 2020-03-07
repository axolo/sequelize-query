'use strict';

const qs = require('qs');
const sequelizeQuery = require('../src/index');

const querystring = `attributes=["name",["phone","mobile"]]\
&include=["role","group"]\
&deletedAt=null&status=1\
&where={"$or":[{"createdAt":{"$between":["20191105","20191106"]}},\
{"updatedAt":{"$between":["20191107","20191108"]}}]}\
&order[]=["createdAt","desc"]\
&order[]=["updatedAt","asc"]\
&offset=10&page_size=20\
&access_token=TOKEN`

const query = qs.parse(querystring);
console.log('\nQuery from querystring with access_token and CUSTOM key limit to page_size');
console.log('\n---------- query ----------');
console.log(query);

const options = { loggin: console.log };
const keys = {
  limit: 'page_size',
  accessToken: 'access_token'
};
const withPrams = sequelizeQuery(query, { options, keys });
console.log('\n---------- custom key -----');
console.log(withPrams);

const withoutParams = sequelizeQuery(query);
console.log('\n---------- default --------');
console.log(withoutParams);
