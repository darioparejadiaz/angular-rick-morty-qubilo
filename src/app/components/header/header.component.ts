import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { GenderSelectComponent } from '../gender-select/gender-select.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, GenderSelectComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
