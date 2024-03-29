import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeConvert'
})
export class DateTimeConvertPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    var milliseconds = new Date().getTime() - new Date(value).getTime();
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;

    if(this.round(seconds, 0) < 60)
      value = this.round(seconds, 0).toString() + "s ago";
    else if(this.round(minutes, 0) < 60)
      value = this.round(minutes, 0).toString() + "m ago";
    else if(this.round(minutes, 0) >= 60 && this.round(hours, 0) < 24)
      value = this.round(hours, 0).toString() + "h ago";
    else
      value = this.round(days, 0).toString() + "d ago";

    return value;
  }

  round(number, precision){
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);

    return roundedTempNumber / factor;
  }

}
