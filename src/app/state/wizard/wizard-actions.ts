import { createAction, props } from "@ngrx/store";
import { FieldData } from "src/app/models/field-data";

export const addField = createAction(
   '[Stepper Page] Add Field',
   props<FieldData>()
);

export const updateField = createAction(
   '[Stepper Page] Update Field',
   props<FieldData>()
)

export const removeField = createAction(
   '[Stepper Page] Remove Field',
   props<{ id: string }>()
);

export const loadFields = createAction('[Stepper Page] Load Fields');

export const loadFieldsSuccess = createAction(
   '[Stepper Page] Load Fields Success',
   props<{ fields: FieldData[] }>()
);

export const loadFieldsFailure = createAction(
   '[Stepper Page] Load Fields Failure',
   props<{ error: string }>()
);
