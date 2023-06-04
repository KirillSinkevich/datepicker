import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ConnectedPosition,
} from "@angular/cdk/overlay";
import moment from 'moment-timezone';
import {IDate} from "../../../core/interfaces/date.interface";
import {DirectionsEnum} from "../../../core/enums/directions.enum";
import {TrackBy} from "../../../core/types/track-by.type";
import {trackBy} from "../../../core/utils/track-by.helper";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {fadeInUp} from "../../../core/animations/fade.animation";
import {datepickerImports} from "@components/datepicker/datepicker.imports";

moment.locale('ru');
moment.updateLocale("ru", { week: {
  dow: 1,
  doy: 4
}});

type selectorType = 'year' | 'month';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [datepickerImports],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp]
})
export default class DatepickerComponent implements OnInit {
  @Input() set inputDate(date: string) {
    this._date = moment.tz(date, '');
    this.selectedDate = moment.tz(date, '').format('DD.MM.YY');
  }
  @Input() disabledDates: string[] = [];

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport | undefined;

  daysOfWeek: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  dates: IDate[] = [];
  months: IDate[] = [];
  years: IDate[] = [];

  firstDayIndex: number = 1;
  selectedDate: string = '';

  calIsActive: boolean = false;
  monthIsActive = false;
  yearIsActive = false;
  readonly trackBy: TrackBy = trackBy;

  readonly directions = DirectionsEnum;
  readonly monthSelPosition: ConnectedPosition[] = [{
    'originX': 'center',
    'originY': 'bottom',
    'overlayX': 'center',
    'overlayY': 'top',
    'weight': 1,
    'offsetY': 6
  }];
  readonly yearSelPosition: ConnectedPosition[] = [{
    'originX': 'start',
    'originY': 'bottom',
    'overlayX': 'start',
    'overlayY': 'top',
    'weight': 1,
    'offsetY': 6
  }];

  private _alreadyScroll: boolean = false;
  private _selectedMonthIdx: number = 0;
  private _selectedYearIdx: number = 2000;
  private _date: moment.Moment = moment();

  ngOnInit(): void {
    this._generateCalendar();
  }

  onOpenCalendar(): void {
    this.calIsActive = true;
  }

  onCloseCalendar(): void {
    this.calIsActive = false;
  }

  onClickArrow(direction: DirectionsEnum): void {
    if (direction === this.directions.Left) {
      this._date = moment.tz(this._date, '').subtract(1, 'month');
    } else {
      this._date = moment.tz(this._date, '').add(1, 'month');
    }

    this._generateCalendar();
  }

  onClearDate(): void {
    this.selectedDate = '';
    this._date = moment.tz('');
    this._generateCalendar();
    this.onOpenCalendar();
  }

  onChangeDate(event: string): void {
    if (event.length < 7 || !moment(event, 'DD.MM.YY', true).isValid()) return;

    this._date = moment.tz(event, 'DD.MM.YYYY', '');
    this.selectedDate = moment.tz(event, 'DD.MM.YY', '').format('DD.MM.YY');
    this._generateCalendar();
  }

  onOpenMonthSelect(): void {
    this.monthIsActive = true;
  }

  onCloseMonthSelect(): void {
    this.monthIsActive = false
    this._alreadyScroll = false;
  }

  onOpenYearSelect(): void {
    this.yearIsActive = !this.yearIsActive;
  }

  onCloseYearSelect(): void {
    this.yearIsActive = false
    this._alreadyScroll = false;
  }

  onSelectDate(date: IDate): void {
    if (date?.disabled) return;
    this.selectedDate = moment.tz(date.date, '').format('DD.MM.YY');
    this._generateCalendar();
  }

  onSelectMonthOrYear(date: IDate, type: selectorType): void {
    this._date = moment.tz(date.date, '');
    this._generateCalendar();
    type === 'month' ? this.onCloseMonthSelect() : this.onCloseYearSelect();
  }

  scroll(event: any, type: 'year' | 'month'): void {
    if (event === 0 && !this._alreadyScroll) {
      const index: number = type === 'year' ? this._selectedYearIdx : this._selectedMonthIdx;

      this.viewPort?.scrollToIndex(index, 'smooth');
      this._alreadyScroll = true;
    }
  }

  dateFormat(format: string): string {
    return this._date.format(format);
  }

  private _generateCalendar(): void {
    this.firstDayIndex = moment.tz(this._date, '').startOf('month').isoWeekday();

    this.dates = this._generateDays();
    this.months = this._generateMonths();
    this.years = this._generateYears();
  }

  private _generateDays(): IDate[] {
    const daysCount: number = moment.tz(this._date, '').daysInMonth();
    return [...Array(daysCount)].map((day, idx: number) => {
      const date: moment.Moment = moment.tz(this._date, '').date(idx + 1);

      return {
        today: this._isToday(date),
        selected: this._isSelected(date),
        disabled: this._isDisabled(date),
        date: date,
      }
    });
  }

  private _generateMonths(): IDate[] {
    return [...Array(12)].map((month, idx: number) => {
      const date: moment.Moment = moment.tz(this._date, '').month(idx);
      const selected: boolean = this._isSameStartOf(date, 'month');

      if (selected) {
        this._selectedMonthIdx = idx - 1;
      }

      return {
        selected: selected,
        date: date,
        stringDate: moment(date).format('MMMM'),
      };
    });
  }

  private _generateYears(): IDate[] {
    const countYears: number = moment.tz(this._date, '').year() - 1900;
    const startYear: moment.Moment = moment.tz(this._date, '').subtract(countYears, 'years');

    return [...Array(200)].map((year, idx: number) => {
      const date: moment.Moment = moment.tz(startYear, '').add(idx, 'year');
      const selected: boolean = this._isSameStartOf(date, 'year');

      if (selected) {
        this._selectedYearIdx = idx - 1;
      }

      return {
        selected: selected,
        date: date,
        stringDate: moment(date).format('YYYY'),
      };
    });
  }

  private _isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private _isSelected(date: moment.Moment): boolean {
    return moment(date, 'DD.MM.YY').startOf('day').isSame(moment.tz(this.selectedDate, 'DD.MM.YYYY',''), 'day');
  }

  private _isSameStartOf(date: moment.Moment, union: 'year'| 'month'): boolean {
    return moment(date, 'DD.MM.YYYY').startOf(union).isSame(moment.tz(this._date, ''), union)
  }

  private _isDisabled(date: moment.Moment): boolean {
    return this.disabledDates.includes(moment.tz(date, '').format('DD.MM.YYYY'));
  }
}
