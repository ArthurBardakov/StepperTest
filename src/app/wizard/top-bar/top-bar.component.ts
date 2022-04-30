import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { StepperService } from '../../services/stepper.service';
import { UnsubscribeOnDestroyAdapter } from '../../services/unsubscribe-adapter.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent
extends UnsubscribeOnDestroyAdapter
implements AfterViewInit {

  @Input() public Steps!: number;
  @Output() public FormGroupList: EventEmitter<FormGroup[]>;
  public FormGroupList$: Observable<FormGroup[]>;
  public ManualSelect: number;

  constructor(
    private formBuilder: FormBuilder,
    public stepperSrc: StepperService) {
    super();
    this.FormGroupList = new EventEmitter<FormGroup[]>();
    this.FormGroupList$ = this.FormGroupList.asObservable();
    this.ManualSelect = 0;
  }

  ngAfterViewInit(): void {
    this.initFormGroups();
    this.triggerManualStep();
  }
  
  private triggerManualStep(): void {
    this.subs.sink = this.stepperSrc.OnStep
    .subscribe((v) => this.ManualSelect = v);
  }

  private initFormGroups(): void {
    const groups: FormGroup[] = [];

    for (let i = 0; i < this.Steps; i++) {
      const ctrl = `ctrl${i}`;
      const gr = this.formBuilder.group({});
      gr.setControl(ctrl, this.formBuilder.control('', Validators.required));
      groups.push(gr);      
    }
    this.FormGroupList.next(groups);
  }

  public SetIndex(step: StepperSelectionEvent): void {
    this.stepperSrc.EmitStep(step.selectedIndex);
  }
}
