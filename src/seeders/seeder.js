require('dotenv').config()
const path = require('path');
const { Seeder } = require('mongo-seeding');
const dataPath = "./src/seeders/data";

const config = {
    database: process.env.DB_HOST,
    dropDatabase: true,
  };

const execute = async () => {
    const seeder = new Seeder(config);

    // Data should be defined as described here: https://github.com/pkosiec/mongo-seeding/blob/main/docs/import-data-definition.md
    const collections = seeder.readCollectionsFromPath(path.resolve(dataPath));
    console.log("About to import collections -> ", collections.length);

    try {
        if (collections.length > 0) 
        {
            await seeder.import(collections);
        } else {
            console.log("Nothing to import");
        }
      } catch (err) {
        console.log("Something went wrong while importing collections", err);
      }
      console.log("Successfully imported all collections");
}

execute();