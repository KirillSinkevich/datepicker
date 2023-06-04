import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {RegistrySvg, SVG_ICONS} from "./shared/tokens/svg-icons";
import {iconsList} from "./shared/tokens/icons-list";

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    @Inject(SVG_ICONS) svg: RegistrySvg
  ) {
    svg.registry(iconsList)
  }
}
