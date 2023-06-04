import {inject, InjectionToken} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface RegistrySvg {
  registry(icons: readonly string[], path?: string): void;
}

export const SVG_ICONS = new InjectionToken<RegistrySvg>(
  'an abstraction over material svg icon registry',
  {
    providedIn: 'root',
    factory: svgIconsFactory,
  },
);

export function svgIconsFactory(): RegistrySvg {
  const registry = inject(MatIconRegistry);
  const sanitizer = inject(DomSanitizer);

  return {
    registry(icons: readonly string[], path: string = '../../assets/icons'): void {
      icons.forEach((icon: string) => {
        const safePath: SafeResourceUrl =
          sanitizer.bypassSecurityTrustResourceUrl(`${path}/${icon}.svg`);
        registry.addSvgIcon(icon, safePath);
      });
    },
  };
}
