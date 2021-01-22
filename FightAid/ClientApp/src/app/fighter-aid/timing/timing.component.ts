import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time.service';

@Component({
  selector: 'timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.scss'],
})
export class TimingComponent implements OnInit {
  timerAdded: Subscription;
  timerRemoved: Subscription;
  times: number[] = [];

  constructor(
    public timeService: TimeService
  ) {}

  ngOnInit() {
    this.timerAdded = this.timeService.timerAdded.subscribe((result: number) => {
      this.times.push(result);
    });

    this.timerRemoved = this.timeService.timerRemoved.subscribe((result: number) => {
      const index = this.times.indexOf(result, 0);
      if (index > -1) {
        this.times.splice(index, 1);
      }
    }); 
  }
}
