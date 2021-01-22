import { EventEmitter, Injectable } from "@angular/core";
import { constants } from "../app/constants";

@Injectable()
export class TimeService {

  timeUpdated: EventEmitter<number> = new EventEmitter<number>();
  timerAdded: EventEmitter<number> = new EventEmitter<number>();
  timerRemoved: EventEmitter<number> = new EventEmitter<number>();

  generateTimeString(time: number, multiple: number) {
    let seconds = Math.floor(time / multiple)

    let timeString: string = "";

    let days = seconds / constants.secondsInADay;
    if (days >= 1) {
      let wholeDays = Math.floor(days);
      timeString += (wholeDays + "d ");
      seconds = seconds - (wholeDays * constants.secondsInADay);
    }
    else {
      timeString += "0d ";
    }

    let hours = seconds / constants.secondsInAnHour;
    if (hours >= 1) {
      let wholeHours = Math.floor(hours);
      timeString += (wholeHours + "h ");
      seconds = seconds - (wholeHours * constants.secondsInAnHour);
    }
    else {
      timeString += "0h ";
    }

    let minutes = seconds / constants.secondsInAMinute;
    if (minutes >= 1) {
      let wholeMinutes = Math.floor(minutes);
      timeString += (wholeMinutes + "m ");
      seconds = seconds - (wholeMinutes * constants.secondsInAMinute);
    }
    else {
      timeString += "0m "
    }

    return timeString += (seconds + "s");
  }
}
