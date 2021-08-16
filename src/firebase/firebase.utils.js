import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDcQAkC4_-KLzDshdA0uZNhtnFNHMUiZJA",
  authDomain: "e-commerce-site-a21da.firebaseapp.com",
  projectId: "e-commerce-site-a21da",
  storageBucket: "e-commerce-site-a21da.appspot.com",
  messagingSenderId: "382821959892",
  appId: "1:382821959892:web:f1a1a2b5543279e0b11341",
  measurementId: "G-B09H0TKVXV"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
