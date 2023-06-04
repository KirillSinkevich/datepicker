import moment from "moment";

export interface IDate {
  date: moment.Moment;
  selected?: boolean;
  today?: boolean;
  disabled?: boolean;
  stringDate?: string;
}
