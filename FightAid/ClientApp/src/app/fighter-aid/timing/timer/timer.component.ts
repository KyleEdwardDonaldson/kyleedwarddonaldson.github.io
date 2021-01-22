import { Component, Input, OnInit } from '@angular/core';
import { TimeService } from '../../../../services/time.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input()
  time: number;

  timeLeft: number;
  interval;
  timeString: string;

  started: boolean;

  constructor(
    public timeService: TimeService
  ) {}

  ngOnInit() {
    this.timeString = this.timeService.generateTimeString(this.time, 1);
    this.timeLeft = this.time;
  }

  startTimer() {
    this.started = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timeString = this.timeService.generateTimeString(this.timeLeft, 1);
      } else {
        this.timeLeft = 0;;
        this.timeString = "0d 0h 0m 0s"
      }
    }, 1000)
  }

  stopTimer() {
    this.started = false;
    clearInterval(this.interval);
  }

  removeTimer() {
    this.timeService.timerRemoved.emit(this.time);
  }
}
