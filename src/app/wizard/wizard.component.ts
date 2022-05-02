import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FieldDetails } from '../models/field-details';
import { StepperService } from '../services/stepper.service';
import { loadFields } from '../state/wizard/wizard-actions';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterContentChecked {

  public FieldDetails!: FieldDetails[];

  constructor(
    private detector: ChangeDetectorRef,
    private stepperSrc: StepperService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFields());
    this.initSteps();
  }

  private initSteps(): void {
    this.FieldDetails = [
      {
        Name: 'Name',
        Type: 'string',
        Placeholder: 'Last name, First name'
      },
      {
        Name: 'Age',
        Type: 'number',
        Placeholder: 'Your age'
      }
    ];    
    this.stepperSrc.SetMaxStep(this.FieldDetails.length);
  }

  ngAfterContentChecked(): void {
    this.detector.detectChanges();
  }
}
