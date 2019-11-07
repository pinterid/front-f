import * as statements from '../sql/statements';
import * as gitlab from './GitLab';
var alasql = require('alasql')

export const Database = () => {

  // Init tables
  alasql(statements.init_tables)
};

//methode object wid mitgegeben

export async function fill(user) {
  await gitlab.fill(user);
}
