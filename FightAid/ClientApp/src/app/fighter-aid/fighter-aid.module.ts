import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TimeService } from "../../services/time.service";
import { FighterAidComponent } from "./fighter-aid.component";
import { TimeCalcComponent } from "./time-calc/time-calc.component";
import { TimeMultipleComponent } from "./time-calc/time-multiple/time-multiple.component";
import { TimerComponent } from "./timing/timer/timer.component";
import { TimingComponent } from "./timing/timing.component";

@NgModule({
  declarations: [
    FighterAidComponent,
    TimingComponent,
    TimeCalcComponent,
    TimeMultipleComponent,
    TimerComponent
  ],

  imports: [
    CommonModule
  ],

  exports: [
    FighterAidComponent
  ],

  providers: [
    TimeService
  ],

  entryComponents: [
  ]
})
export class FighterAidModule { }
