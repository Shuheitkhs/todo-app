import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDoKZqqbgkQaum9j2GRGaiBW-szGu0NRNQ",
    authDomain: "todo-app-6b185.firebaseapp.com",
    projectId: "todo-app-6b185",
    storageBucket: "todo-app-6b185.appspot.com",
    messagingSenderId: "1040541511360",
    appId: "1:1040541511360:web:5c998d96ca85a735c74725"
  };
  
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
