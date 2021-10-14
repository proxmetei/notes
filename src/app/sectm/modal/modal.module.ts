
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalsectionComponent } from './modalsection/modalsection.component';
import { ModalnoteComponent } from './modalnote/modalnote.component';

@NgModule({
  declarations: [
    ModalsectionComponent,
    ModalnoteComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalsectionComponent,
    ModalnoteComponent
  ],
  entryComponents: [ModalsectionComponent, ModalnoteComponent]
})
export class ModalModule { }
