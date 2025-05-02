import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NiceHeaderComponent } from './nice-header/nice-header.component';
import { CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NiceHeaderComponent,
    MainPageComponent,
    CdkDropList,
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
