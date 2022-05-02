import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, merge, Observable, take } from 'rxjs';
import { selectAllFields } from '../state/wizard/wizard-selectors';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  public IsLinearCompletion: boolean;
  public NextStep: EventEmitter<number>;
  public PrevStep: EventEmitter<number>;
  public get OnStep(): Observable<number> {
    return merge(
      this.NextStep.asObservable(),
      this.PrevStep.asObservable()
    );
  }
  public get IsFirstStep(): boolean {
    return this.Step === 0;
  }
  public get IsLastStep(): boolean {
    return this.Step === this.MaxStep;
  }  
  private maxStep!: number;
  public get MaxStep() : number {
    return this.maxStep;
  }
  private set MaxStep(v : number) {
    this.maxStep = v;
  }
  private prevStep : number;
  public get Step() : number {
    return this.prevStep;
  }

  constructor(private store: Store) {
    this.IsLinearCompletion = true;
    this.NextStep = new EventEmitter<number>();
    this.PrevStep = new EventEmitter<number>();
    this.prevStep = 0;
    this.updateStep();
  }

  private updateStep(): void {
    this.store.select((state: any) =>
      selectAllFields(state))
      .pipe(map(fields => fields.length), filter(v => v !== 0), take(1))
      .subscribe(v => this.prevStep = v);
  }

  public EmitStep(step: number) {
    if (step === -1 || step > this.maxStep) return;
    if (this.prevStep < step) {
      this.prevStep = step;
      this.NextStep.emit(step);
    } else if (this.prevStep > step) {
      this.prevStep = step;
      this.PrevStep.emit(step);
    }
  }

  public SetMaxStep(maxStep: number): void {
    this.maxStep = maxStep;
  }
}
