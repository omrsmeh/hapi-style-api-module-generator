'use strict';

var Sequelize = require('sequelize');

var DataResource = class DataResource {

  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
      }
    );

    this.sequelizeTableRules = {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  }

  get connection() {
    return this.sequelize;
  }

  get tableRules() {
    return this.sequelizeTableRules;
  }
};

module.exports = new DataResource();
