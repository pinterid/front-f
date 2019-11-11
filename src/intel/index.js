<<<<<<< HEAD
import * as statements from './sql/statements';
import * as alasql from 'alasql';

//import { Database } from "./dummy";
import * as imp from "./implement";

imp.Database();
=======
import * as alasql from 'alasql'


//import { Database } from "./dummy";
import { Database, fill } from "./implement";
Database();
>>>>>>> 89f63f3692a01715d59f797e25969a96a74045b2

export const fillDbFromUser = (username) => {
  //console.log(db.exec('SELECT * FROM organization_has_member'))
<<<<<<< HEAD
  console.log(alasql('SELECT * FROM platform'));
}

export const fillDbFromUser = (user) => {
  imp.fill(user).then(()=> console.log(alasql('SELECT * FROM platform')))
  //imp.fill(user).then(()=> console.log(alasql('SELECT * FROM organization')))
=======
  fill(username).then(() => {
    console.log(alasql('SELECT * FROM platform_has_repository'));
  })
>>>>>>> 89f63f3692a01715d59f797e25969a96a74045b2
}