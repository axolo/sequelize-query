'use strict';

const _ = require('lodash');
const deepMerge = require('deepmerge');
const deepMapKeys = require('deep-map-keys');
const Sequelize = require('sequelize');

module.exports = (query, params = {}) => {
  let { sequelize = Sequelize, options, keys, excludeOps = [] } = params;
  options = {
    offset: 0,
    limit: 1000,
    ...options,
  };
  keys = {
    include: 'include',
    where: 'where',
    order: 'order',
    offset: 'offset',
    limit: 'limit',
    ...keys,
  };
  excludeOps = [ ...excludeOps ];

  const { Op } = sequelize;
  const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
  };

  if (query[keys.include]) {
    const $include = query[keys.include];
    const include = Array.isArray($include) ? $include.map(o => _.isObject(o) ? o : JSON.parse(o)) : JSON.parse($include);
    options = deepMerge.all([ options, { include } ]);
  }

  let where = _.omit(query, Object.values(keys));
  if (query[keys.where]) {
    const $where = _.isObject(query[keys.where]) ? query[keys.where] : JSON.parse(query[keys.where]);
    const ops = _.omit(operatorsAliases, excludeOps)
    where = deepMerge.all([ where, deepMapKeys($where, key => ops[key] || key) ]);
  }
  options = deepMerge.all([ options, { where } ]);

  if (query[keys.order]) {
    const $order = query[keys.order];
    const order = Array.isArray($order) ? $order.map(o => _.isObject(o) ? o : JSON.parse(o)) : JSON.parse($order);
    options = deepMerge.all([ options, { order } ]);
  }

  if (query[keys.offset]) {
    const offset = parseInt(query[keys.offset]) || options.offset || 0;
    options = deepMerge.all([ options, { offset } ]);
  }

  if (query[keys.limit]) {
    const limit = parseInt(query[keys.limit]) || options.limit || 1;
    options = deepMerge.all([ options, { limit } ]);
  }

  return options;
};
