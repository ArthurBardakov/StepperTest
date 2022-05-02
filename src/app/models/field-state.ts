import { LoadStatus } from "../enums/load-status";
import { FieldData } from "./field-data";

export interface FieldState {
   fields: FieldData[];
   error: string;
   status: LoadStatus;
}
