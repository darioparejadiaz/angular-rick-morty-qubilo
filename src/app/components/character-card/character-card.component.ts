//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Imports

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Character card component

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CharacterCardComponent implements OnInit {
  //*************************************** */
  //*************************************** */
  // Props

  @Input() characterId!: number;
  @Input() imageUrl!: string;
  @Input() characterName!: string;
  @Input() characterGender!: string;

  public characterIdentity!: string;

  //*************************************** */
  //*************************************** */
  // Life cycle

  ngOnInit(): void {
    this.characterIdentity = `${this.characterId} - ${this.characterName}`;
  }
}

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
