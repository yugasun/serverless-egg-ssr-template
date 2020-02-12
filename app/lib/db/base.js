'use strict';
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

// cloud funciton only has write access to /tmp
// so need copy mock data to /tmp for usage
const sourcePath = path.resolve(__dirname, 'blog.json');
const dbpath = path.resolve('/tmp', 'blog.json');
fs.writeFileSync(dbpath, fs.readFileSync(sourcePath))

module.exports = class DB {
  constructor(name = dbpath) {
    this.name = name;
    console.log('this.name', this.name);
  }
  getUniqueId() {
    return shortid.generate();
  }
  get(collectionName) {
    return null;
  }
  getByWhere(collectionName, json) {
    return null;
  }
  add(collectionName, json) {
    return null;
  }
  update(collectionName, where, json) {
    return null;
  }
  delete(collectionName, field) {
    return null;
  }
  getPager(collectionName, query) {
    return null;
  }
};