import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  signature: string;
  block: string;
  sender: string;
  recipient: string;
  amount: string;
  previousBlockHash: string;
}

export interface TransactionWithTimestamp extends Transaction {
  timestamp: Timestamp | number;
}
