import { Component, Input } from '@angular/core';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {

  @Input() public CanStep!: boolean;
  public readonly BackBtn: string;
  public readonly NextBtn: string;

  constructor(public stepperSrc: StepperService) {
    this.CanStep = false;
    this.BackBtn = 'BACK';
    this.NextBtn = 'NEXT';
  }

  public TriggerStep(direction: number): void {
    if (!this.CanStep && direction === 1) {
      alert('Fill in the data correctly, please!');
      return;
    }
    this.stepperSrc.EmitStep(this.stepperSrc.Step + direction);
  }
}
