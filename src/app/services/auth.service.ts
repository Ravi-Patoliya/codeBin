import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid?: string;
  constructor(private router: Router) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
      } else {
        console.log('no user');
        this.uid = '';
      }
    });
  }

  isAuthenticated(): boolean {
    return this.uid ? true : false;
  }

  getUid(): string {
    return this.uid!;
  }
  registerUser(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  logoutUser() {
    const auth = getAuth();
    auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
