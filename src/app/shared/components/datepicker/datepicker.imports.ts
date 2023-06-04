import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule} from "@angular/cdk/overlay";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClickOutsideDirective} from "../../../core/directives/click-outside.directive";

export const datepickerImports = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  NgClass,
  CdkOverlayOrigin,
  CdkConnectedOverlay,
  OverlayModule,
  NgForOf,
  ReactiveFormsModule,
  NgStyle,
  DatePipe,
  FormsModule,
  NgIf,
  ClickOutsideDirective
];
