import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SandboxTableComponent } from './sandbox-table/sandbox-table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SandboxTableComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
