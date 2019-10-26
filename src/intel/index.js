import * as statements from './sql/statements';
import * as alasql from 'alasql'

//import { Database } from "./dummy";
import { Database } from "./implement";

let db = Database();

export const testCall = () => {
  console.log(db.exec('SHOW TABLES'))
}