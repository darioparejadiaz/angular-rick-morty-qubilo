import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharactersService } from '../../services/characters.service';
import { CharacterResponse } from '../../models/character-response.model';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characters-page',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.css',
})
export class CharactersPageComponent implements OnInit {
  private charactersService = inject(CharactersService);

  public characters!: Character[];

  private characterCounter = 27;

  ngOnInit(): void {
    // this.charactersService
    //   .getCharacters()
    //   .subscribe((response: CharacterResponse) => {
    //     console.log(response.results);
    //     this.characters = response.results;
    //   });

      this.charactersService.getMultipleCharacters(this.characterCounter).subscribe(characters => {
        console.log(characters);
        this.characters = characters;
      })
  }
}
