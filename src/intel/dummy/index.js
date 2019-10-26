import * as statements from '../sql/statements';
var alasql = require('alasql')

export const Database = () => {
  let db = new alasql.Database('dummyDb');

  // Init tables
  db.exec(statements.init_tables)

  //Init dummy data
  return db
}