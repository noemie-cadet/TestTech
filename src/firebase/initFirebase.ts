import { initializeApp } from "firebase/app";

const firebaseConfig = {
  databaseURL: "https://test-tech-53941-default-rtdb.europe-west1.firebasedatabase.app",
  apiKey: "AIzaSyDQ58zZDP3WIaDytyJlqDNhRHkrB2cbEnE",
  authDomain: "test-tech-53941.firebaseapp.com",
  projectId: "test-tech-53941",
  storageBucket: "test-tech-53941.appspot.com",
  messagingSenderId: "793001199314",
  appId: "1:793001199314:web:c801d8b4272240ec090f0b",
  measurementId: "G-F89DL1PKQJ",
};

const app = initializeApp(firebaseConfig);

export { app };
