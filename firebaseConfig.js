
import {initializeApp, getApp, getApps} from 'firebase/app';
import { getDatabase }  from 'firebase/database';
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "c",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };


var app;
if (!getApps().length){
  app = initializeApp(firebaseConfig); 
}
else{
  const APPS = getApps();
  app = APPS[0]; 
}

export const db = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);



