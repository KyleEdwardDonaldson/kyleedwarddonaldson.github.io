import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../../services/time.service';
import { constants } from '../../../constants';

@Component({
  selector: 'time-multiple',
  templateUrl: './time-multiple.component.html',
  styleUrls: ['./time-multiple.component.scss'],
})
export class TimeMultipleComponent implements OnInit {
  @Input() multiple: number;

  timeUpdate: Subscription;
  timeString: string;
  timeInSeconds: number;

  constructor(
    public timeService: TimeService
  ) {}

  ngOnInit() {
    this.timeUpdate = this.timeService.timeUpdated.subscribe((result: number) => {
      this.timeInSeconds = Math.floor(result / this.multiple);
      this.timeString = this.timeService.generateTimeString(result, this.multiple);
    });
  }

  addTimer() {
    this.timeService.timerAdded.emit(this.timeInSeconds);
  }
}
