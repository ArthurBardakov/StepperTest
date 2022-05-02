import { createReducer, on } from "@ngrx/store";
import { LoadStatus } from "src/app/enums/load-status";
import { FieldData } from "src/app/models/field-data";
import { FieldState } from "src/app/models/field-state";
import { addField, loadFields, loadFieldsFailure, loadFieldsSuccess, removeField, updateField } from "./wizard-actions";

export const initialState: FieldState = {
   fields: [],
   error: '',
   status: LoadStatus.Pending
}

export const wizardReducer = createReducer(
   initialState,
   on(addField, (state, fd: FieldData) => ({
      ...state,
      fields: [
         ...state.fields,
         {
            id: fd.id,
            value: fd.value
         }
      ],
      status: LoadStatus.Success
   })),
   on(updateField, (state, fd: FieldData) => ({
      ...state,
      update: fd,
      fields: state.fields,
      status: LoadStatus.Success
   })),
   on(removeField, (state, { id }) => ({
      ...state,
      fields: state.fields.filter(f => f.id !== id)
   })),
   on(loadFields, (state) => ({ ...state, status: LoadStatus.Loading })),
   on(loadFieldsSuccess, (state, { fields }) => ({
      ...state,
      fields: fields,
      status: LoadStatus.Success
   })),
   on(loadFieldsFailure, (state, { error }) => ({
      ...state,
      error: error,
      status: LoadStatus.Failure
   }))
);
