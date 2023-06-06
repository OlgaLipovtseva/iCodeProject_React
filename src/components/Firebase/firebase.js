import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
import { firebaseConfig } from "../../constants/api-keys";

class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getDatabase();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);
  doSignOut = () => signOut(this.auth);
  doPasswordReset = (email) => sendPasswordResetEmail(this.auth, email);
  doPasswordUpdate = (password) =>
    updatePassword(this.auth.currentUser, password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        let RefdbElement = this.doGetDbElement("users", authUser.uid);
        onValue(RefdbElement, (snapshot) => {
          const dbUser = snapshot.val();
          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
          };
         // console.log(authUser);
          next(authUser);
        });
      } else {
        fallback();
      }
    });

  // *** User API ***
  doWriteUserData = (uid, username, email, roles) => {
    set(ref(this.db, "users/" + uid), {
      username,
      email,
      roles,
    });
  };

  //ref on Firebase database, element in database by uid
  doGetDb = (dbname) => ref(this.db, dbname + "/");
  doGetDbElement = (dbname, uid) => ref(this.db, dbname + "/" + uid);
}

export default Firebase;
