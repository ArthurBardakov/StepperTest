import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WizardModule } from './wizard/wizard.module';
import { StoreModule } from '@ngrx/store';
import { wizardReducer } from './state/wizard/wizard-reducer';
import { WizardEffectsService } from './services/wizard-effects.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WizardModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({ fields: wizardReducer }),
    EffectsModule.forRoot([ WizardEffectsService ]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
