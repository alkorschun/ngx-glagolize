# NgxGlagolize

NgxGlagolize is an Angular library for handling translations and localization in your Angular applications.

## How to Install

To install NgxGlagolize, run the following command:

```sh
ng add ngx-glagolize
```
You have to provide HttpClient so the library works properly

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), //Provide this
    provideNgxGlagolizeConfig({fallbackLanguage: 'en'})
   
  ],
};
```
The default config for NgxGlagolize is provided automatically after ``ng add``.
You can change the fallback language for the case the user chooses a language that is not provided by you.

## How to Use

First of all you can generate languge files via following command
```sh
ng generate ngx-glagolize:language --code de --project demo-app
```
This command generates a de.json languge file in your public directory.
This file can be filled wit key value pairs.
```json
{
    "key": "value"
}
```

In case you need an alternative for plural forms, you can use the following structure
```json
{
    "key": {"one": "value", "other":"values"}
}
```

Then next step should be a call that initiales the load of a language file. app.component.ts would be a good place to do that:
```typescript
 ngxGlagolizeService = inject(NgxGlagolizeService);

  constructor() {
    this.ngxGlagolizeService.init('en');
  }
```

There are two ways to provide some translation strings:

1) Using the NgxGlagolizeDirective
    ```html
    <div ngxGlagolize key="test">test translation</div>
    ```

    The key parameter is required. This key is extracted from the current loaded language file.
    There is also an optional parameter to determine whether to use a singular or plural form of the word.

    ```html
    <div ngxGlagolize key="test" [plural]="true">test translation</div>
    ```
2) Using the NgxGlagolizeService
    In the component.ts you can inject the NgxGlagolizeService und use the ``.get(key)`` method to retrieve a languge string

### Placeholders
In case you need to replace some placeholders in your strings you can pass an object with all values just like that:
```html
<div ngxGlagolize key="greeting" [placeholder]="placeholderValues">test translation</div>
```
In your component.ts you would define the ``placeholderValues`` like this:
```typescript
 placeholderValues = { name: 'Mirko' };
```
And use ``{{name}}`` in your language file:
```json
{
  "greeting": "Hallo {{name}}!"
}
```

### Extract translation keys
Finally you don't have to write all the keys down. There is a command that extracts all used keys from your project and adds them to the languge files:
```sh
ng generate ngx-glagolize:extract-keys --project demo-app
```