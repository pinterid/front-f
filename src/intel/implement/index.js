import * as statements from '../sql/statements';
import * as github from './GitHub'
var alasql = require('alasql');

export const Database = () => {

  // Init tables
  alasql(statements.init_tables)
  

}
export async function fill(user) {
    await github.fill(user);
}
