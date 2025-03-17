# NgxGlagolize

NgxGlagolize is an Angular library for handling translations and localization in your Angular applications.

## Installation

To install NgxGlagolize, run the following command:

```sh
ng add ngx-glagolize
```

### Configuration

You must provide `HttpClient` so that the library works properly. Add the following configuration to your `appConfig`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Required for NgxGlagolize
    provideNgxGlagolizeConfig({ fallbackLanguage: 'en' })
  ],
};
```

After running `ng add ngx-glagolize`, a default configuration is automatically provided. You can modify the fallback language to handle cases where a user selects an unsupported language.

## Usage

### Generating Language Files

Generate a language file using the following command:

```sh
ng generate ngx-glagolize:language --code de --project demo-app
```

This creates a `de.json` language file in your public directory, which can be populated with key-value pairs:

```json
{
  "key": "value"
}
```

For plural forms, use the following structure:

```json
{
  "key": { "one": "value", "other": "values" }
}
```

### Initializing Language Loading

Call the initialization method to load a language file. A good place for this is `app.component.ts`:

```typescript
ngxGlagolizeService = inject(NgxGlagolizeService);

constructor() {
  this.ngxGlagolizeService.init('en');
}
```

### Providing Translation Strings

NgxGlagolize offers two ways to use translation strings:

#### 1. Using the `NgxGlagolizeDirective`

```html
<div ngxGlagolize key="test">test translation</div>
```

- The `key` parameter is required and maps to the corresponding value in the loaded language file.
- To handle pluralization, use the `plural` parameter:

```html
<div ngxGlagolize key="test" [plural]="true">test translation</div>
```

#### 2. Using the `NgxGlagolizeService`

Inject `NgxGlagolizeService` in your component and use the `.get(key)` method to retrieve a language string.

```typescript
private ngxGlagolizeService = inject(NgxGlagolizeService) 
protected translatedString = this.ngxGlagolizeService.get('test');
```

### Extracting Translation Keys Automatically

To avoid manually adding all translation keys, use the following command to extract them from your project and update language files:

```sh
ng generate ngx-glagolize:extract-keys --project demo-app
```

This ensures your language files contain all used keys, reducing the risk of missing translations.

