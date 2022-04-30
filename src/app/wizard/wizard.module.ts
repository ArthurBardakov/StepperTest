import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ContentComponent } from './content/content.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperService } from '../services/stepper.service';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    TopBarComponent,
    ContentComponent,
    BottomBarComponent,
    WizardComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    WizardComponent
  ],
  providers: [
    StepperService
  ]
})
export class WizardModule {}