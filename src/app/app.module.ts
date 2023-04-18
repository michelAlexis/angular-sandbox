import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TableModule } from 'primeng/table';
import {
  AppComponent,
  CdkTableRowTemplateDirective,
  MatTableRowTemplateDirective,
  NgTableRowTemplateDirective,
  OrPipe,
} from './app.component';
import { AmiTableComponentModule } from './table.component';

import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TableModule,
    AmiTableComponentModule,
    NgTableRowTemplateDirective,
    MatTableModule,
    MatTableRowTemplateDirective,
    OrPipe,
    CdkTableModule,
    CdkTableRowTemplateDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
