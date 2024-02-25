import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './pages.component.html'
})
export class PagesComponent {
}
