import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

export interface AccountInfo extends AccountInfoData {
  accid: string;
}
export interface AccountInfoData {
  name: string;
  description: string;
}

export interface LayoutInfo extends LayoutInfoData {
  layoutid: string;
}
export interface LayoutInfoData {
  title: string;
}

export interface CollaborationInfo extends CollaborationInfoData {
  id: string;
}
export interface CollaborationInfoData {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private afs: AngularFirestore) { }

  getAccountsForUser(uid: string): Observable<AccountInfo[]> {
    return this.afs.collection<AccountInfoData>('accounts', ref => ref.where('owner_uid', '==', uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AccountInfoData;
        const id = a.payload.doc.id;
        return { accid: id, ...data };
      }))
    );
  }

  getLayoutsForAccount(accid: string): Observable<LayoutInfo[]> {
    return this.afs.collection<LayoutInfo>('accounts/' + accid + '/layouts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LayoutInfoData;
        const id = a.payload.doc.id;
        return { layoutid: id, ...data };
      }))
    );
  }

  getCollaborationsForAccount(accid: string) {
    return this.afs.collection<CollaborationInfoData>('accounts/' + accid + '/collaborations')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as CollaborationInfoData;
          const id = a.payload.doc.id;
          return { id: id, ...data };
        }))
      );
  }
}
