import * as statements from '../sql/statements';
var alasql = require('alasql');

export const Database = () => {

  // Init tables
  alasql(statements.init_tables)

}
