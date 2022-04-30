import { EventEmitter, Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';

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
    return this.Step === this.maxStep;
  }
  private maxStep!: number;
  private prevStep : number;
  public get Step() : number {
    return this.prevStep;
  }

  constructor() {
    this.IsLinearCompletion = true;
    this.NextStep = new EventEmitter<number>();
    this.PrevStep = new EventEmitter<number>();
    this.prevStep = 0;
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
