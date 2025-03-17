import { Component, inject } from '@angular/core';
import { NgxGlagolizeDirective, NgxGlagolizeService } from 'ngx-glagolize';

@Component({
  selector: 'app-root',
  imports: [NgxGlagolizeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo-app';
  placeholderValues = { name: 'Mirko' };

  ngxGlagolizeService = inject(NgxGlagolizeService);

  constructor() {
    this.ngxGlagolizeService.init('de');
  }
}
