import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeService } from '../../../services/time.service';
import { constants } from '../../constants';

@Component({
  selector: 'time-calc',
  templateUrl: './time-calc.component.html',
  styleUrls: ['./time-calc.component.scss'],
})
export class TimeCalcComponent {

  constructor(
    public timeService: TimeService
  ) { }

  timeString: string = "0d 0h 0m 0s";
  timeInSeconds: number = 0;

  updateTime(time: string) {
    
    if (time != null) {
      
      this.timeInSeconds =
        this.calculateTotalSeconds(
          time.split(" ")
        );

      this.generateTimeStrings();
    }
  }

  generateTimeStrings() {
    this.timeService.timeUpdated.emit(this.timeInSeconds);
    this.timeString = this.timeService.generateTimeString(this.timeInSeconds, 1);
  }

  calculateTotalSeconds(timeBits: string[]): number {
    let dayString = timeBits.find(tb => tb.includes("d"));
    dayString = dayString ? dayString : timeBits[0];

    let hourString = timeBits.find(tb => tb.includes("h"));
    hourString = hourString ? hourString : timeBits[1];

    let minuteString = timeBits.find(tb => tb.includes("m"));
    minuteString = minuteString ? minuteString : timeBits[2];

    let secondString = timeBits.find(tb => tb.includes("s"));
    secondString = secondString ? secondString : timeBits[3];

    let days = this.tidyTime(dayString);
    let hours = this.tidyTime(hourString);
    let minutes = this.tidyTime(minuteString);
    let seconds = this.tidyTime(secondString);

    let daysInSeconds = days * constants.secondsInADay;
    let hoursInSeconds = hours * constants.secondsInAnHour;
    let minutesInSeconds = minutes * constants.secondsInAMinute;

    return daysInSeconds + hoursInSeconds + minutesInSeconds + seconds; 
  }

  tidyTime(time: string) {
    if (time) {
      let tidied = time.replace(/\D/g, '').trim();

      if (this.isNumber(tidied)) {
        return Number(tidied);
      }
    }
    return 0;
  }

  isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  addDay() {
    this.timeInSeconds += constants.secondsInADay;
    this.generateTimeStrings();
  }

  addHour() {
    this.timeInSeconds += constants.secondsInAnHour;
    this.generateTimeStrings();
  }

  addMin() {
    this.timeInSeconds += constants.secondsInAMinute;
    this.generateTimeStrings();
  }

  addSec() {
    this.timeInSeconds += 1;
    this.generateTimeStrings();
  }
}
