import {ChangeDetectionStrategy, Component} from '@angular/core';
import DatepickerComponent from "@components/datepicker/datepicker.component";

@Component({
  standalone: true,
  imports: [DatepickerComponent, DatepickerComponent],
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExampleComponent {
  date: string = '2023-06-10T23:00:00-04:00';
  disabledDates: string[] = ['04.06.2023', '05.06.2023', '06.06.2023', '07.06.2023', '08.06.2023', '09.06.2023', '10.06.2023'];
}
