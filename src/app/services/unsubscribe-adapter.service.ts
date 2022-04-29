import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-uns',
  template: ``
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UnsubscribeOnDestroyAdapter implements OnDestroy {

  subs = new SubSink();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
