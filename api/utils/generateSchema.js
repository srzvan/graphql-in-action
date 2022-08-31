const fs = require('fs');

const objectSchema = require('../src/schema/index');
const { printSchema } = require('graphql');

/*
 * TODO
 * Fix package.json command to run this script
 */
fs.writeFile('../src/schema/schema.graphql', printSchema(objectSchema), function (error) {
  if (error) {
    return console.log(
      '❌ Generate schema - an error occured and the schema.graphql could not be generated'
    );
  }

  console.log('✅ schema.graphql generated successfully');
});
