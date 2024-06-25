import { Injectable, inject } from '@angular/core';

import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cards, CardsData } from '../interfaces/cards-data.interface';

const PATH = 'cards-info'

@Injectable({
  providedIn: 'root'
})
export class CardsInfoService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  getCardsInfo() {
    return collectionData(this._collection) as Observable<any[]>;
  }

  addCardInfo(cardData: CardsData) {
    return addDoc(this._collection, cardData);
  }

  async getCardInfo(id: string) {
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as CardsData;
    } catch (error) {
      return undefined;
    }
  }
}
