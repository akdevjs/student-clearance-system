import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK6yfTtXQLqq1QTHXGRet-cdh437-EjgE",
  authDomain: "student-clearance-system-6c2e2.firebaseapp.com",
  projectId: "student-clearance-system-6c2e2",
  storageBucket: "student-clearance-system-6c2e2.appspot.com",
  messagingSenderId: "881974623024",
  appId: "1:881974623024:web:5ee5a2a9634c61fdab66f5",
  measurementId: "G-0DC8MRFMC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
