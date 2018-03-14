import { RxDocument, RxCollection, RxDatabase } from 'rxdb';

declare interface RxExpenseDocumentType {
  rowid: number;
  date?: Date;
  type?: string;
  description?: string;
  amount?: number;
}

export type RxExpenseDocument = RxDocument<RxExpenseDocumentType>;

declare class RxExpenseCollection extends RxCollection<RxExpenseDocumentType> {
  // pouch: any    // don't know why we need this
}

export class RxExpensesDatabase extends RxDatabase {
  expense?: RxExpenseCollection;
}

declare let _default: {
  RxExpenseCollection,
  RxExpensesDatabase
};

export default _default;
