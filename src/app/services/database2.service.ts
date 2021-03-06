import { Injectable } from '@angular/core';

import * as RxDB from 'rxdb';
import { QueryChangeDetector, RxDatabase} from "rxdb";

import { configRxdbLocationPlugin } from "../rxdb-plugins/rxdb-location.plugin";

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

const locationPlugin = configRxdbLocationPlugin({ location: 'default' });

// const adapters = {
//   websql: require('pouchdb-adapter-websql'),
//   idb: require('pouchdb-adapter-idb')
// };
//
// const useAdapter = 'idb';
// RxDB.plugin(adapters[useAdapter]);

const useAdapter = 'cordova-sqlite';

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
    RxDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
    RxDB.plugin(locationPlugin);

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
