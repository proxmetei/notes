import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { NoteComponent } from './note/note.component';
import {SectionService} from '../service/section.service';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { DateformatPipe } from './dateformat.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [SectionComponent, NoteComponent, DateformatPipe],
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
      BrowserModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      ColorPickerModule,
      DragDropModule,
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'ru',
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })

  ],
  exports: [SectionComponent]
})
export class SectmModule { }
