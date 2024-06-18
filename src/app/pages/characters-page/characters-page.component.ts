//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Imports

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { CharacterResponse } from '../../models/character-response.model';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Character page component

@Component({
  selector: 'app-characters-page',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, ButtonModule],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.css',
})
export class CharactersPageComponent implements OnInit {
  //*************************************** */
  //*************************************** */
  // Props

  private characters: Character[] = [];
  public charactersPerPage: Character[] = [];

  private readonly CARDS_PER_PAGE: number = 9;

  public currentIndex: number = 0;
  public endIndex: number = 0;

  public totalCharacters: number = 0;

  public isNextCharactersButtonDisabled: boolean = false;
  public isPreviousCharactersButtonDisabled: boolean = true;

  public truncateResult: boolean = false;

  public gender: string = 'all';

  //*************************************** */
  //*************************************** */
  // Dependency Injection

  private charactersService = inject(CharactersService);

  //*************************************** */
  //*************************************** */
  // Life cycle

  ngOnInit(): void {
    if (
      localStorage.getItem('currentIndex') &&
      localStorage.getItem('gender')
    ) {
      this.getState();
      this.getCharacters(this.gender);
    } else {
      this.getAllCharacters();
    }

    this.charactersService.gender$.subscribe((gender) => {
      this.currentIndex = 0;
      this.endIndex = 0;
      this.gender = gender;

      this.saveState();

      this.getCharacters(this.gender);
    });
  }

  //*************************************** */
  //*************************************** */
  // Methods

  private getAllCharacters() {
    this.resetState();

    if(!localStorage.getItem("currentIndex")) this.resetState();

    this.charactersService
      .getAllCharacters()
      .subscribe((response: CharacterResponse) => {
        this.totalCharacters = response.info.count;
        const totalPages = response.info.pages;
        const requests = [];

        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.charactersService.getAllCharacters(page));
        }

        forkJoin(requests).subscribe((results: CharacterResponse[]) => {
          results.forEach((result: CharacterResponse) => {
            this.characters.push(...result.results);
          });
          console.log(this.characters);
          this.updateCharacters();
        });
      });
  }

  //*************************************** */

  private getFilteredCharacters(gender: string) {
    this.resetState();

    if(!localStorage.getItem("currentIndex")) this.resetState();

    this.charactersService
      .getCharactersByGender(gender)
      .subscribe((response: CharacterResponse) => {
        this.totalCharacters = response.info.count;
        const totalPages = response.info.pages;
        const requests = [];

        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            this.charactersService.getCharactersByGender(gender, page)
          );
        }

        forkJoin(requests).subscribe((results: CharacterResponse[]) => {
          results.forEach((result: CharacterResponse) => {
            this.characters.push(...result.results);
          });
          console.log(this.characters);
          this.updateCharacters();
        });
      });
  }

  //*************************************** */

  private updateCharacters() {
    this.endIndex = this.currentIndex + this.CARDS_PER_PAGE;
    this.charactersPerPage = this.characters.slice(
      this.currentIndex,
      this.endIndex
    );

    console.log(this.charactersPerPage);
  }

  //*************************************** */

  public onLoadNextCharacters() {
    this.currentIndex += this.CARDS_PER_PAGE;
    this.saveState();
    this.changeButtonsState('next');
    this.updateCharacters();
  }

  //*************************************** */

  public onLoadPreviousCharacters() {
    this.currentIndex -= this.CARDS_PER_PAGE;
    this.saveState();
    this.changeButtonsState('previous');
    this.updateCharacters();
  }

  //*************************************** */

  private resetState() {
    this.characters = [];
    this.charactersPerPage = [];

    this.isNextCharactersButtonDisabled = false;
    this.isPreviousCharactersButtonDisabled = true;

    this.truncateResult = false;
  }

  //*************************************** */

  private changeButtonsState(action: 'previous' | 'next') {
    if (action === 'previous') {
      this.truncateResult = false;
      this.isNextCharactersButtonDisabled = false;
      if (this.currentIndex <= 0) {
        this.isPreviousCharactersButtonDisabled = true;
      }
    } else if (action === 'next') {
      this.isPreviousCharactersButtonDisabled = false;
      if (
        this.currentIndex > this.totalCharacters ||
        this.endIndex + this.CARDS_PER_PAGE > this.totalCharacters
      ) {
        this.truncateResult = true;
        this.isNextCharactersButtonDisabled = true;
      }
    }
  }

  //*************************************** */

  private saveState() {
    localStorage.setItem('currentIndex', this.currentIndex.toString());
    localStorage.setItem('gender', this.gender);
    localStorage.setItem(
      'nextBtn',
      JSON.stringify(this.isNextCharactersButtonDisabled)
    );
    localStorage.setItem(
      'prevtBtn',
      JSON.stringify(this.isPreviousCharactersButtonDisabled)
    );
    localStorage.setItem('truncated', JSON.stringify(this.truncateResult));
  }

  //*************************************** */

  private getState() {
    this.currentIndex = Number(localStorage.getItem('currentIndex')) || 0;
    this.gender = localStorage.getItem('gender') || 'all';

    localStorage.getItem('nextBtn') === 'true'
      ? (this.isNextCharactersButtonDisabled = true)
      : (this.isNextCharactersButtonDisabled = false);

    localStorage.getItem('prevtBtn') === 'true'
      ? (this.isPreviousCharactersButtonDisabled = true)
      : (this.isPreviousCharactersButtonDisabled = false);

    localStorage.getItem('truncated') === 'true'
      ? (this.truncateResult = true)
      : (this.truncateResult = false);
  }

  //*************************************** */

  private getCharacters(gender: string) {
    if (gender === 'all') {
      this.getAllCharacters();
    } else {
      this.getFilteredCharacters(gender);
    }
  }
}

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
