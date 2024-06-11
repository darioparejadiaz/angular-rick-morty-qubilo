import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CharacterResponse } from '../models/character-response.model';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private API_URL = environment.API_URL;

  private http = inject(HttpClient);

  public getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.API_URL}/character`);
  }

  public getMultipleCharacters(
    characterCounter: number
  ): Observable<Character[]> {
    const counter = JSON.stringify(this.getCharacterCounter(characterCounter));
    return this.http.get<Character[]>(`${this.API_URL}/character/${counter}`);
  }

  private getCharacterCounter(characterCounter: number): number[] {
    const initialCounter = characterCounter - 8;
    const counter = [];

    for (let i = initialCounter; i <= characterCounter; i++) {
      counter.push(i);
    }

    return counter;
  }
}
