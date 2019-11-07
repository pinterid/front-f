import * as statements from './sql/statements';
import * as alasql from 'alasql'
import * as github from './implement/GitHub'

//import { Database } from "./dummy";
import { Database } from "./implement";

Database();

export const fillDbFromUser = (username) => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
  github.fill(username).then(() => {
    console.log(alasql('SELECT * FROM platform'));
  })
}