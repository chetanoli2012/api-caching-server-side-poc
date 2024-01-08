// cacheUtil.js
const cache = require("memory-cache");

const cacheUtil = {
  get: (key) => cache.get(key),
  set: (key, value, duration) => cache.put(key, value, duration * 1000),
};

module.exports = cacheUtil;
