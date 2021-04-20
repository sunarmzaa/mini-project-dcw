import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyDtxkjVm6CKcCYNM0nlT__VPshLmSZCqkQ",
  authDomain: "nextjs-1dafc.firebaseapp.com",
  projectId: "nextjs-1dafc",
  storageBucket: "nextjs-1dafc.appspot.com",
  messagingSenderId: "980643857894",
  appId: "1:980643857894:web:0cf1f89e6e7019caf84227"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
//   firebase.analytics();


const storage = firebase.storage()
export {
  storage, firebase as default
}