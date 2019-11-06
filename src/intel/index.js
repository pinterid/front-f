import * as statements from './sql/statements';
import * as alasql from 'alasql'

import { Database } from "./dummy";
//import { Database } from "./implement";

let db = Database();

export const testCall = () => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
  console.log(db.exec('SELECT * FROM statistic'))
  console.log(db.exec('SELECT * FROM statistic WHERE id=1'))
  db.exec('UPDATE statistic SET current_streak_id = ? WHERE id = ?', [1,1])
  console.log(db.exec('SELECT * FROM statistic'))
}