import * as statements from './sql/statements';
import * as alasql from 'alasql'

//import { Database } from "./dummy";
import { Database } from "./implement";

Database();

export const testCall = () => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
  console.log(alasql('SELECT * FROM platform'));
}