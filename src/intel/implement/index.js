<<<<<<< HEAD
import * as statements from '../sql/statements';
import * as gitlab from './GitLab';
var alasql = require('alasql')
=======
import * as statements from '../Database/Statements/Create';
import * as github from './GitHub'
var alasql = require('alasql');
>>>>>>> 89f63f3692a01715d59f797e25969a96a74045b2

export const Database = () => {

  // Init tables
  alasql(statements.init_tables)
<<<<<<< HEAD
};
=======
  
>>>>>>> 89f63f3692a01715d59f797e25969a96a74045b2

//methode object wid mitgegeben

export async function fill(user) {
  await gitlab.fill(user);
}
export async function fill(user) {
    await github.fill(user);
}
