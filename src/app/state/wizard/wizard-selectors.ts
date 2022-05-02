import { createSelector } from "@ngrx/store";
import { FieldState } from "src/app/models/field-state";
import { AppState } from "../app.state";

export const selectFields = (state: AppState) => state.fields;
export const selectAllFields = createSelector(
  selectFields,
  (state: FieldState) => state.fields
);
