//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Imports

import { Component, ViewEncapsulation } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { GenderSelectComponent } from '../gender-select/gender-select.component';

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Header component

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, GenderSelectComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {}

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
