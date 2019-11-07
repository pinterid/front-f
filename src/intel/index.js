import * as statements from './sql/statements';
import * as alasql from 'alasql'


//import { Database } from "./dummy";
import { Database, fill } from "./implement";
Database();

export const fillDbFromUser = (username) => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
  fill(username).then(() => {
    console.log(alasql('SELECT * FROM platform'));
  })
}