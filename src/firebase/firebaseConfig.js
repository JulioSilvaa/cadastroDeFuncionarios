import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2tLu4gXOh2G2pgNj17lw2pTx4rFx3xlk",
  authDomain: "dbcolaboradores-d7f0f.firebaseapp.com",
  databaseURL: "https://dbcolaboradores-d7f0f-default-rtdb.firebaseio.com",
  projectId: "dbcolaboradores-d7f0f",
  storageBucket: "dbcolaboradores-d7f0f.appspot.com",
  messagingSenderId: "275908719781",
  appId: "1:275908719781:web:4585c2d3fa57179870c94c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
