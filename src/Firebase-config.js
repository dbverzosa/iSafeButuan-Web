// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBou1L78C7rdDgEyT0Q6JR5HcAKjr_yjz8",
  authDomain: "mobile-app-db368.firebaseapp.com",
  projectId: "mobile-app-db368",
  storageBucket: "mobile-app-db368.appspot.com",
  messagingSenderId: "221327722667",
  appId: "1:221327722667:web:cddf58b4da240f9212cfee",
  measurementId: "G-LM0BNVDBSR"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const firestore = getFirestore(app);



// export { firestore };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const firestore = getFirestore(app);

export default firestore;