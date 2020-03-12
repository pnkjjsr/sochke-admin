import firebase from "firebase/app";
import "firebase/auth";
import clientCredentials from "../firebaseConfig";
import { service } from "utils/apiConnect";
import authSession from "./authSession";

export default class Authentication {
  initialize() {
    return new Promise((resolve, reject) => {
      if (!firebase.apps.length) {
        firebase.initializeApp(clientCredentials);
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            resolve(user);
          } else {
            console.log("Not Logged In");
          }
        });
      }
    });
  }

  createUserWithEmailAndPassword(email, password) {
    let _this = this;
    return new Promise(function(resolve, reject) {
      _this.initialize();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          resolve(result);
        })
        .catch(function(error) {
          resolve(error);
        });
    });
  }

  signInWithEmail(email, password) {
    let _this = this;
    return new Promise(function(resolve, reject) {
      _this.initialize();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          resolve(result);
        })
        .catch(function(error) {
          resolve(error);
        });
    });
  }

  getBearerToken = token => {
    const session = new authSession();
    session.setBearerToken(token);
    return token;
  };

  signOut() {
    this.initialize();
    firebase
      .auth()
      .signOut()
      .then(function(result) {
        console.log("Logout Successfully");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  recaptchaVerifier(e) {
    this.initialize();
    let recaptchaVerifier;
    return (recaptchaVerifier = new firebase.auth.RecaptchaVerifier(e, {
      size: "invisible",
      callback: function(response) {
        onSignInSubmit();
      }
    }));
  }

  async signInWithPhoneNumber(phoneNumber, appVerifier) {
    let confirm;
    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function(confirmationResult) {
        confirm = confirmationResult;
      })
      .catch(function(error) {
        console.log(error);
      });
    return confirm;
  }

  signInWithCustomToken(token) {
    let user;
    const data = {
      uid: token
    };
    service
      .post("/user", data)
      .then(result => {
        user = result;
      })
      .catch(error => {
        console.log(error);
      });
    return user;
  }

  async linkWithPhoneNumber(phoneNumber, appVerifier) {
    let confirm;
    await firebase
      .auth()
      .currentUser.linkWithPhoneNumber(phoneNumber, appVerifier)
      .then(
        function(confirmationResult) {
          confirm = confirmationResult;
        },
        function(err) {
          confirm = err;
        }
      );
    return confirm;
  }

  sendEmailVerification() {
    this.initialize();

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user
          .sendEmailVerification()
          .then(function() {
            return console.log("Verification email sent.");
          })
          .catch(function(error) {
            return console.log(error);
          });
      } else {
        console.log("Not Logged In");
      }
    });
  }

  sendPasswordResetEmail = e => {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.initialize();
      let actionCodeSettings = {
        // localhost below
        // url: `http://localhost:3000/login`,
        // Firebase authenticate Domain add 'www.sochke.com'
        url: `https://www.${process.env.authDomain}/login`,
        // iOS: {
        //   bundleId: "com.example.ios"
        // },
        // android: {
        //   packageName: "com.example.android",
        //   installApp: true,
        //   minimumVersion: "12"
        // },
        handleCodeInApp: true
      };

      firebase
        .auth()
        .sendPasswordResetEmail(e, actionCodeSettings)
        .then(function() {
          resolve({
            code: "email/email-sent",
            message: "Password reset email sent."
          });
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  updatePassword(e) {
    this.initialize();

    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .currentUser.updatePassword(e)
        .then(function() {
          resolve("Update successful.");
        })
        .catch(function(error) {
          resolve(error);
        });
    });
  }
}
