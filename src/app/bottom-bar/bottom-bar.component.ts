import { Component } from '@angular/core';
import { StepperService } from '../services/stepper.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {

  constructor(public stepperSrc: StepperService) { }

  public TriggerStep(step: number): void {    
    this.stepperSrc.EmitStep(this.stepperSrc.Step + step);
  }
}
