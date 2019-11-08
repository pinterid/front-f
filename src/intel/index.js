import * as statements from './sql/statements';
import * as alasql from 'alasql';

//import { Database } from "./dummy";
import * as imp from "./implement";

imp.Database();

export const testCall = () => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
  console.log(alasql('SELECT * FROM platform'));
}

export const fillDbFromUser = (user) => {
  imp.fill(user).then(()=> console.log(alasql('SELECT * FROM platform')))
  //imp.fill(user).then(()=> console.log(alasql('SELECT * FROM organization')))
}