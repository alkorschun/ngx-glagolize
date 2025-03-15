
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, Observable } from 'rxjs';
import { LanguageStrings } from './models/language-strings.interface';
import { NGX_GLAGOLIZE_CONFIG } from './ngx-glagolize.provider';


@Injectable({
  providedIn: 'root'
})
export class NgxGlagolizeService {

  private http = inject(HttpClient);
  private config = inject(NGX_GLAGOLIZE_CONFIG);
  private languageCode = signal<string>('');
  private strings = rxResource({
    request: () => ({ language: this.languageCode() }),
    loader: ({ request }) => this.loadLanguageStrings(request.language),
  });

  constructor() { }

  init(langugageCode: string): void {
    this.languageCode.set(langugageCode);
  }

  get(key: string) {
    if (this.strings.value()){
      return this.strings.value()![key];
    }
   
    return undefined;
  }

  private loadLanguageStrings(languageCode: string): Observable<LanguageStrings> {
    return this.http.get<LanguageStrings>(`languages/${languageCode}.json`)
      .pipe(
        catchError(() => {
          console.error(`Failed to load language strings for ${languageCode}`);
          this.init(this.config.fallbackLanguage);
          return EMPTY;
        }
        )
      );
  }
}
