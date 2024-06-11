import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CharacterCardComponent {

  @Input() imageUrl!: string;
  @Input() characterName!: string;
  @Input() characterGender!: string;

}
