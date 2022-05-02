import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { delay, filter, finalize, from, map, merge, of, switchMap, take, tap } from 'rxjs';
import { selectAllFields } from 'src/app/state/wizard/wizard-selectors';
import { StepperService } from '../../services/stepper.service';
import { UnsubscribeOnDestroyAdapter } from '../../services/unsubscribe-adapter.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent
extends UnsubscribeOnDestroyAdapter
implements OnInit {

  @Input() public FormGroupList!: FormGroup[];
  public ManualSelect: number;
  private selectionDetect: boolean;

  constructor(
    public stepperSrc: StepperService,
    private store: Store,
    private detector: ChangeDetectorRef) {
    super();
    this.ManualSelect = 0;
    this.selectionDetect = true;
  }

  ngOnInit(): void {
    this.triggerManualStep();
  }

  private triggerManualStep(): void {
    this.subs.sink = merge(
      this.stepperSrc.OnStep,
      this.store.select((state: any) =>
        selectAllFields(state))
        .pipe(
          map(fields => fields.length),
          filter(v => v !== 0),
          take(1))
        )
    .pipe(
      filter(v => v !== 0),
      tap(v => {
        this.stepperSrc.IsLinearCompletion = false;
        this.selectionDetect = false;
      }),
      map(v => new Array(v + 1).fill(0).map((_, i) => i)),
      switchMap(range => of(...range).pipe(
        delay(100),
        finalize(() => {
          this.stepperSrc.IsLinearCompletion = true;
          this.selectionDetect = true;
        })
      )),
      tap(v => this.ManualSelect = v)
    )
    .subscribe();
  }

  public SetIndex(step: StepperSelectionEvent): void {
    if (this.selectionDetect) {      
      this.stepperSrc.EmitStep(step.selectedIndex);
    }
  }
}
