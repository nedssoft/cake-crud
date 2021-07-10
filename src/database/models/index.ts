const fs = require('fs');
const path = require('path');
import { Sequelize } from 'sequelize-typescript';

const envConfigs = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const uri: string = config.url || '';
 const modelPath = '/**/*.model.js'
let sequelize: Sequelize;

if (config.url) {
  sequelize = new Sequelize(uri, config);
} else {
  sequelize = new Sequelize({
    ...config,
    models: [__dirname + modelPath],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.model')).toLowerCase() ===
        member.toLowerCase()
      );
    },
  });
}


export { Sequelize, sequelize };
