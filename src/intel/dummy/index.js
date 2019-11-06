import * as statements from '../sql/statements';
var alasql = require('alasql');
var faker = require('faker');

export const Database = () => {
  //let db = new alasql.Database('dummyDb');
  const count = (table) => alasql(`SELECT COUNT(*) FROM ${table}`)[0]['COUNT(*)'];
  const random = (base) => Math.floor(Math.random() * base) + 1;
  const randomBtw = (max, min) => Math.floor(Math.random() * (+max - +min)) + +min;

  // Init tables
  //db.exec(statements.init_tables);
  alasql(statements.init_tables);
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
          //db.exec(table, entries_resolved);
          alasql(table,entries_resolved)
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

  // Create dummies
  create_dummy(statements.create_platform, [
    "GitHub",
    faker.internet.url,
    faker.internet.avatar,
    faker.internet.url,
    "schettnet",
    faker.internet.email,
    faker.internet.userName,
    faker.date.recent,
    faker.address.streetAddress,
    "Status",
    "StatusHTML"
  ], 3);
  create_dummy(statements.create_organization, [
    faker.internet.avatar,
    faker.internet.url,
    faker.internet.userName,
  ], 20);
  create_dummy(statements.create_member, [
    faker.internet.avatar,
    faker.name.findName,
    faker.internet.userName,
    faker.internet.url,
  ], 20);
  create_dummy(statements.create_languagePie, [
    function () { return randomBtw(1000, 2000) },
    function () { return randomBtw(1000, 2000) }
  ], 20);
  create_dummy(statements.create_repository, [
    faker.internet.avatar,
    faker.internet.userName,
    function () { return random(count("member")) },
    function () { return random(count("languagePie")) }
  ], 20);
  create_dummy(statements.create_languageSlice, [
    function () { return randomBtw(1000, 2000) },
    function () { return randomBtw(1000, 2000) },
    function () { return random(count("languagePie")) }
  ], 20);
  create_dummy(statements.create_languageCrumb, [
    faker.internet.userName,
    function () { return randomBtw(1000, 2000) },
    "#ffffff",
    function () { return random(count("languageSlice")) }
  ], 20);
  create_dummy(statements.create_busiestDay, [
    faker.date.recent,
    function () { return randomBtw(1000, 2000) }
  ], 20);
  create_dummy(statements.create_statistic, [
    function () { return randomBtw(2001, 2019) },
    function () { return random(count("busiestDay")) },
    function () { return random(count("platform")) }
  ], 2);
  create_dummy(statements.create_calendar, [
    faker.date.recent,
    function () { return randomBtw(0, 53) },
    function () { return randomBtw(0, 6) },
    function () { return randomBtw(200, 3232) },
    "#FFFFFFF",
    function () { return random(count("platform")) }
  ], 3);
  create_dummy(statements.create_contrib, [
    faker.date.recent,
    faker.internet.userName,
    faker.internet.url,
    function () { return randomBtw(20, 2000) },
    function () { return randomBtw(10, 2323) },
    function () { return randomBtw(1, 50) },
    function () {
      let types = ["commit", "pullRequest", "issue"];
      return types[Math.floor(Math.random() * types.length)]
    },
    function () { return random(count("languageSlice")) },
    function () { return random(count("calendar")) }
  ], 22);
  create_dummy(statements.create_streak, [
    faker.date.recent,
    faker.date.recent,
    function () { return randomBtw(213, 500) },
    function () { return random(count("statistic")) }
  ], 20);

  create_dummy(statements.update_statistic_current_streak, [
    function () { return random(count("streak")) },
    function () { return random(count("statistic")) }
  ], 2);

  // Mappings
  create_dummy(statements.map_platform_has_organization, [
    function () { return random(count("platform")) },
    function () { return random(count("organization")) }
  ], 20);

  create_dummy(statements.map_organization_has_member, [
    function () { return random(count("organization")) },
    function () { return random(count("member")) }
  ], 20);

  //return db;
}