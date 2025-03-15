import { InjectionToken } from '@angular/core';
import { Config } from './models/config.interface';


export const NGX_GLAGOLIZE_CONFIG = new InjectionToken<Config>('NGX_GLAGOLIZE_CONFIG');

export function provideNgxGlagolizeConfig(config: Config): any {
  return { provide: NGX_GLAGOLIZE_CONFIG, useValue: config };
}