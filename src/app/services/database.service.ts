import { Injectable } from '@angular/core';

import * as RxDB from 'rxdb';
import { QueryChangeDetector, RxDatabase} from "rxdb";

import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

// import * as expenseSchema from '../schemas/expense.schema.json';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

// const adapters = {
//   'cordova-sqlite': require('pouchdb-adapter-cordova-sqlite')
// };

const adapters = {
  'cordova-sqlite': cordovaSqlitePlugin
};

const useAdapter = 'cordova-sqlite';
RxDB.plugin(adapters[useAdapter]);
// import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
// if (ENV === 'development') {
//   // schema-checks should be used in dev-mode only
//   RxDB.plugin(RxDBSchemaCheckModule);
// }

import RxDBValidateModule from 'rxdb/plugins/validate';
RxDB.plugin(RxDBValidateModule);

// import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
// RxDB.plugin(RxDBLeaderElectionModule);

// import RxDBReplicationModule from 'rxdb/plugins/replication';
// RxDB.plugin(RxDBReplicationModule);

// RxDB.plugin(cordovaSqlitePlugin);


let collections = [
  {
    name: 'expense',
    schema: require('../schemas/expense.schema.json')
  }
];

@Injectable()
export class DatabaseService {
  static dbPromise: Promise<RxDatabase> = null;
  private async _create(): Promise<RxDatabase> {

    console.log('DatabaseService: creating database..');
    const db: RxDatabase = await RxDB.create({
      name: 'newionic',
      adapter: useAdapter,
      password: 'myLongAndStupidPassword'
    });
    console.log('DatabaseService: created database');

    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(<any>colData)));

    return db;
  }

  get(): Promise<RxDatabase> {
    if (DatabaseService.dbPromise) return DatabaseService.dbPromise;

    DatabaseService.dbPromise = this._create();
    return DatabaseService.dbPromise;
  }
}
