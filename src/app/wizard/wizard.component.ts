import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FieldDetails } from '../models/field-details';
import { StepperService } from '../services/stepper.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements AfterContentChecked {

  public NumberOfSteps!: number;
  public Fields!: FieldDetails[];

  constructor(
    private detector: ChangeDetectorRef,
    private stepperSrc: StepperService) {
    this.initSteps();
  }

  private initSteps(): void {
    this.Fields = [
      {
        Name: 'Name',
        Type: 'string',
        Placeholder: 'Last name, First name'
      },
      {
        Name: 'Age',
        Type: 'number',
        Placeholder: 'Your age'
      },
      {
        Name: 'Finished',
        Type: undefined,
        Placeholder: ''
      }
    ];
    this.NumberOfSteps = this.Fields.length;
    this.stepperSrc.SetMaxStep(this.NumberOfSteps - 1);
  }

  ngAfterContentChecked(): void {
    this.detector.detectChanges();
  }

}
