import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ControlComponent } from './timer/control/control.component';
import { PhaseComponent } from './timer/phase/phase.component';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ControlComponent,
    PhaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
