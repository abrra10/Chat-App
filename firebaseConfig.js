
import {initializeApp, getApp, getApps} from 'firebase/app';
import { getDatabase }  from 'firebase/database';
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaDtYcdApq652IN3fiXv6iGdrWWTHBUYU",
    authDomain: "chatapp-eba20.firebaseapp.com",
    projectId: "chatapp-eba20",
    storageBucket: "chatapp-eba20.appspot.com",
    messagingSenderId: "601598600940",
    appId: "1:601598600940:web:e1cf2f6c67529310c167c9"
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



