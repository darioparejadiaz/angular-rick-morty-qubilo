//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Imports

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CharacterResponse } from '../models/character-response.model';
import { Character } from '../models/character.model';
import { Observable, Subject } from 'rxjs';

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Character service

@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  //*************************************** */
  //*************************************** */
  // Variables

  public gender$: Subject<string> = new Subject();

  //*************************************** */
  //*************************************** */
  // Constants

  private API_URL = environment.API_URL;

  //*************************************** */
  //*************************************** */
  // Dependency Injection

  private http = inject(HttpClient);

  //*************************************** */
  //*************************************** */
  // HTTP Methods

  public getAllCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.API_URL}/character/?page=${page}`);
  }

  //**************************************** */

  public getMultipleCharacters(
    characterCounter: number
  ): Observable<Character[]> {
    const counter = JSON.stringify(this.getCharacterCounter(characterCounter));
    return this.http.get<Character[]>(`${this.API_URL}/character/${counter}`);
  }

  //**************************************** */

  public getCharactersByGender(gender: string, page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.API_URL}/character/?gender=${gender}&page=${page}`);
  }

  //*************************************** */
  //*************************************** */
  // Utility Methods

  public setGender(gender: string) {
    this.gender$.next(gender);
  }

  //**************************************** */

  private getCharacterCounter(characterCounter: number): number[] {
    const initialCounter = characterCounter - 8;
    const counter = [];

    for (let i = initialCounter; i <= characterCounter; i++) {
      counter.push(i);
    }

    return counter;
  }

  //**************************************** */
}

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
