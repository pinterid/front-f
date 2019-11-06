import * as statements from '../sql/statements';
var alasql = require('alasql');

export const Database = () => {
  let db = new alasql.Database('dummyDb');
  const count = (table) => db.exec(`SELECT COUNT(*) FROM ${table}`)[0]['COUNT(*)'];
  const random = (base) => Math.floor(Math.random() * base) + 1;
  const randomBtw = (max, min) => Math.floor(Math.random() * (+max - +min)) + +min;

  // Init tables
  db.exec(statements.init_tables)
  // Methods to create dummies
  /*
  const random_mapping = (mapping_table) => {
    for (let index = 1; index <= count(mapping_table[1]); index++) {
      console.log(mapping_table)
      try{
        db.exec(mapping_table[0],[
          index,
          random(count(mapping_table[2]))
        ])
      }
      catch(ex){
        console.warn(`Duplicates while mapping ${mapping_table[1]} with ${mapping_table[2]}!`)
      }
      
    }
  }
  */
  const create_dummy = (table, entries, c) => {
    if (c) {
      try {
        for (let index = 0; index < c; index++) {
          let entries_resolved = entries.map(entry =>
            ((typeof entry == "function") ? entry() : entry));
          //console.log(table, entries_resolved);
          db.exec(table, entries_resolved);
        }
      }
      catch (e) {
        if (e.message === "Cannot insert record, because it already exists in primary key index"
          || "Cannot insert record, because it already exists in unique index") {
          console.warn(e.message);
          //throw e
        } else {
          throw e;
        }
      }
    }
  }

  //Init dummy data
  return db
}