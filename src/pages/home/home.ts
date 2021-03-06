import {Component, HostListener, NgZone} from '@angular/core';
import { NavController} from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Subscription } from "rxjs/Subscription";

import { AddDataPage} from '../add-data/add-data';
import { EditDataPage} from '../edit-data/edit-data';
import { DatabaseService } from "../../app/services/database2.service";

import { QueryChangeDetector, RxDocument, RxDatabase } from "rxdb";
import * as RxDB from 'rxdb';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: RxDocument<any>[];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  expenseSubscription: Subscription;
  test: any;

  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private databaseService: DatabaseService,
    private zone: NgZone
  ) { }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  // @HostListener('deviceready') triggerGetData() {
  //   this.getData();
  // }

  private async getData() {
    // const useAdapter = 'cordova-sqlite';
    // RxDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
    //
    // let collections = [
    //   {
    //     name: 'expense',
    //     schema: require('../../app/schemas/expense.schema.json')
    //   }
    // ];
    //
    // const db: RxDatabase = await RxDB.create({
    //   name: 'newionic',
    //   adapter: useAdapter,
    //   password: 'myLongAndStupidPassword',
    //   options: { location: 'default' },
    //   ignoreDuplicate: true
    // });
    //
    // await Promise.all(collections.map(colData => db.collection(<any>colData)));

    const db = await this.databaseService.get();
    const expenses$ = db['expense'].find().$;
    this.expenseSubscription = expenses$.subscribe(
      (expenses) => {
        this.test = 'inside success subscription';
        this.expenses = expenses;
        this.zone.run(() => { });
      },
      (err) => {
        this.test = err;
      }
    )
    // this.sqlite.create({
    //     name: 'ionicdb.db',
    //   location: 'default'

    // }).then((db: SQLiteObject) => {
    //   db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
    //     .then(res => console.log('Executed SQL'))
    //     .catch(e => console.log(e));
    //   db.executeSql('SELECT * FROM expense ORDER BY rowid DESC', {})
    //     .then(res => {
    //       this.expenses = [];
    //       for (var i = 0; i < res.rows.length; i++) {
    //         this.expenses.push({
    //           rowid: res.rows.item(i).rowid,
    //           date: res.rows.item(i).date,
    //           type: res.rows.item(i).type,
    //           description: res.rows.item(i).description,
    //           amount: res.rows.item(i).amount
    //         })
    //       }
    //     })
    //     .catch(e => console.log(e));
    //   db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
    //     .then(res => {
    //       if (res.rows.length > 0) {
    //         this.totalIncome = parseInt(res.rows.item(0).totalIncome);
    //         this.balance = this.totalIncome - this.totalExpense;
    //       }
    //     })
    //     .catch(e => console.log(e));
    //   db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
    //     .then(res => {
    //       if (res.rows.length > 0) {
    //         this.totalExpense = parseInt(res.rows.item(0).totalExpense);
    //         this.balance = this.totalIncome - this.totalExpense;
    //       }
    //     })
    // }).catch(e => console.log(e));
  }

  addData() {
    this.navCtrl.push(AddDataPage);
  }

  editData(rowid) {
    this.navCtrl.push(EditDataPage, {
      rowid: rowid
    });
  }

  async deleteData(id) {
    // const db = await this.databaseService.get();
    // const expense$ = db['expense'].find({_id: id}).$;
    // this.expenseSubscription = expense$.subscribe(
    //   (expense) => {
    //     if (expense[0]) expense[0].remove();
    //     this.zone.run(() => { });
    //   },
    //   (err) => {
    //     this.test = err;
    //   });
  }

  // deleteData(rowid) {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
  //       .then(res => {
  //         console.log(res);
  //         this.getData();
  //       })
  //       .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }

  async removeDatabase() {
    // const db = await this.databaseService.get();
    // await db.remove();
    RxDB.removeDatabase('newionic', 'cordova-sqlite')
      .then(() => { this.expenses = [] })
      .catch((err) => {
        console.log(err);
      });
    this.zone.run(() => { });
  }

}
