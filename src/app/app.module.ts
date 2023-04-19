import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'table',
        loadComponent: () => import('./sandbox-table/sandbox-table.component'),
      },
      {
        path: 'form',
        loadComponent: () => import('./sandbox-form/sandbox-form.component'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'table',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
