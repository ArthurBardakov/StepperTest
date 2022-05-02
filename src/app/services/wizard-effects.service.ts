import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { WizardService } from './wizard.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, from, map, catchError, of, withLatestFrom } from 'rxjs';
import { selectAllFields } from '../state/wizard/wizard-selectors';
import { addField, loadFields, loadFieldsFailure, loadFieldsSuccess, removeField, updateField } from '../state/wizard/wizard-actions';

@Injectable({
  providedIn: 'root'
})
export class WizardEffectsService {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private wizardSrc: WizardService
  ) { }

  loadFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFields),
      switchMap(() =>
        from(this.wizardSrc.GetFields()).pipe(
          map((fields) => loadFieldsSuccess({ fields: fields })),
          catchError((error) => of(loadFieldsFailure({ error })))
        )
      )
    )
  );

  updateField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateField),
      withLatestFrom(this.store.select(selectAllFields)),
      switchMap(([action, fields]) => from(this.wizardSrc.UpdateField(action, fields)))
    ),
    { dispatch: false }
  );

  saveField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addField, removeField),
      withLatestFrom(this.store.select(selectAllFields)),
      switchMap(([action, fields]) => from(this.wizardSrc.SaveFields(fields)))
    ),
    { dispatch: false }
  );
}
