import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";
import { IUser } from "../../interfaces/user-interface";
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service'
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;
  errorMessage: string;
  userCollection: AngularFirestoreCollection<IUser>;
  currentUser: IUser;
  username: string;
  constructor(private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts", ref =>
      ref.orderBy("createdAt", "desc")
    );
    this.userCollection = _afs.collection<IUser>("users")
  }

  getPosts(): Observable<IPost[]> {
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.posts;
  }

  addPost(post): void {
    this.postsCollection.add(post);
  }

  // Search for a song in our database
  searchResults: Observable<IPost[]>
  searchForASong(songId): Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("songId", "==", songId).orderBy("createdAt", "desc");
    });
    this.searchResults = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.searchResults;
  }

  storeUser(email: string, userId: string, username: string) {
    let user: IUser = {
      email: email,
      username: username    
    }

    this._afs.collection('users').doc(userId).set({
      email: email,
      username: username
    });
  }

  getUserFollowing(userId: string) {
  
  }
  getUsername(userid: string): Observable<IUser[]>{

    let heyho = this._afs.collection<IUser>('users', ref => {
      return ref.where("id", "==", userid)
    });

    console.log("heyho: ", heyho);

    let bigo = heyho.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IUser;
          console.log("DATA: ", data);
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    console.log("Bigo: ", bigo);
        
    return bigo;
    // var hey;

    // this.userCollection.doc(userid).ref.get().then(function(doc) {
    //   if (doc.exists) {
    //       // console.log("Document data:", doc.data());
    //       hey = doc.data();
    //       console.log("IN SERVICE", hey.username);
    //       this.username = hey.username as string;
    //   } else {
    //       console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });

    // return this.username;
  }


}
