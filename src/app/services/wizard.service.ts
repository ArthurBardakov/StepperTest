import { Injectable } from '@angular/core';
import { FieldData } from '../models/field-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  private storageInitialised = false;

  constructor(private storage: Storage) {}

  public async GetFields(): Promise<FieldData[]> {
    if (!this.storageInitialised) {
      await this.storage.create();
      // await this.storage.clear();
      this.storageInitialised = true;      
    }

    return (await this.storage.get('fields')) || [];
  }

  public async UpdateField(update: FieldData, fields: FieldData[]): Promise<any> {
    if (this.hasField(update.id, fields)) {
      const filtered = fields.filter(f => f.id !== update.id);
      return await this.SaveFields([...filtered, update]);
    }
    return await this.SaveFields([...fields, update]);
  }

  private hasField(id: string, fields: FieldData[]): boolean {
    return fields.findIndex(f => f.id === id) > -1;
  }

  public async SaveFields(fields: FieldData[]): Promise<any> {
    if (fields.length === 1) {
      await this.storage.create();
      this.storageInitialised = true;
    }
    return await this.storage.set('fields', fields);
  }
}
