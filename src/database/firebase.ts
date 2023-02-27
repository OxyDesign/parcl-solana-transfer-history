import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Transaction } from '@/types/transaction';

const firebaseConfig = {
  apiKey: 'AIzaSyBpwcgamDEOPskhw7BUeaVjSLhNzUaQRF8',
  authDomain: 'sol-transfer-history.firebaseapp.com',
  databaseURL: 'https://sol-transfer-history-default-rtdb.firebaseio.com',
  projectId: 'sol-transfer-history',
  storageBucket: 'sol-transfer-history.appspot.com',
  messagingSenderId: '748488443237',
  appId: '1:748488443237:web:30af30aa1c7e02eaac8d8c',
  measurementId: 'G-RRF124GYH8',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addTransactionToDB = async (transaction: Transaction) => {
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...transaction,
    timestamp: serverTimestamp(),
  });

  return docRef;
};
