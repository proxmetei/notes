import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { TestComponent } from './test/test.component';
import {SectionService} from './service/section.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { SectmModule} from './sectm/sectm.module';
import { ModalModule } from './sectm/modal/modal.module';
import { AppRouting } from './app.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    TestComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ModalModule,
    AppRouting,
    SectmModule,
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
  providers: [SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
