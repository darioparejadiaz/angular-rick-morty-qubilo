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

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Character page component

@Component({
  selector: 'app-characters-page',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
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

  private currentIndex: number = 0;
  private endIndex: number = 0;

  private totalCharacters: number = 0;

  public isNextCharactersButtonDisabled: boolean = false;
  public isPreviousCharactersButtonDisabled: boolean = true;

  //*************************************** */
  //*************************************** */
  // Dependency Injection

  private charactersService = inject(CharactersService);

  //*************************************** */
  //*************************************** */
  // Life cycle

  ngOnInit(): void {
    this.getAllCharacters();

    this.charactersService.gender$.subscribe((gender) => {
      if (gender === 'all') {
        this.currentIndex = 0;
        this.endIndex = 0;
        this.getAllCharacters();
      } else {
        this.currentIndex = 0;
        this.endIndex = 0;
        this.getFilteredCharacters(gender);
      }
    });
  }

  //*************************************** */
  //*************************************** */
  // Methods

  getAllCharacters() {
    this.characters = [];
    this.charactersPerPage = [];

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

  getFilteredCharacters(gender: string) {
    this.characters = [];
    this.charactersPerPage = [];

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

  updateCharacters() {
    this.endIndex = this.currentIndex + this.CARDS_PER_PAGE;
    this.charactersPerPage = this.characters.slice(
      this.currentIndex,
      this.endIndex
    );

    console.log(this.charactersPerPage);
  }

  onLoadNextCharacters() {
    if (this.endIndex < this.totalCharacters) {
      this.isNextCharactersButtonDisabled = false;
      this.isPreviousCharactersButtonDisabled = false;
      this.currentIndex += this.CARDS_PER_PAGE;
      this.updateCharacters();
    } else {
      this.isNextCharactersButtonDisabled = true;
    }
  }

  onLoadPreviousCharacters() {
    const indexCount: number = this.currentIndex - this.CARDS_PER_PAGE;
    if (indexCount >= 0) {
      this.isPreviousCharactersButtonDisabled = false;
      this.currentIndex -= this.CARDS_PER_PAGE;
      this.updateCharacters();
    } else {
      this.isPreviousCharactersButtonDisabled = true;
    }
  }
}
