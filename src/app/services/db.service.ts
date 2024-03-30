import { Injectable } from '@angular/core';
import { addDoc, collection, getFirestore,getDocs,doc,getDoc} from "firebase/firestore";
import { AuthService } from './auth.service';
import { Snippet } from '../models/snippet.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: any
  constructor(private authService: AuthService,private router: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Snippet) {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authService.getUid()
      });
      this.router.navigate(['/']);
      return docRef;
    }
    catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  }

  async getAllSnippets() {
    let snippets :any[]= []
    // Get a list of all snippets
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      snippets.push({ id: doc.id, ...doc.data() })
    });
    return snippets;
  }

 async getSnippetById(id: string) {
    // Get a specific snippet
    const docRef = doc(this.db, "snippets", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return {
        id: "Not found",
        title: "Not found",
        code: "Not found"
      }
    }
  }
}
