import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { GenderSelect } from '../../models/gender-select.model';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-gender-select',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './gender-select.component.html',
  styleUrl: './gender-select.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GenderSelectComponent implements OnInit {
  public genders!: GenderSelect[];
  public genderSelector!: FormGroup;

  private charactersService: CharactersService = inject(CharactersService)

  ngOnInit(): void {
    this.genders = [
      {
        name: 'All',
        code: 'all',
      },
      {
        name: 'Male',
        code: 'male',
      },
      {
        name: 'Female',
        code: 'female',
      },
      {
        name: 'Genderless',
        code: 'genderless',
      },
      {
        name: 'Unknown',
        code: 'unknown',
      },
    ];

    this.genderSelector = new FormGroup({
      gender: new FormControl(null),
    });

    this.genderSelector.valueChanges.subscribe((gender) => {
      this.charactersService.setGender(gender.gender);
    });
  }
}
