import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ControlComponent } from './timer/control/control.component';
import { PhaseComponent } from './timer/phase/phase.component';
import { SharedService } from './services/shared.service';
import { PhaseCounterComponent } from './timer/control/phase-counter/phase-counter.component';
import { RoundCounterComponent } from './timer/control/round-counter/round-counter.component';
import { WarmUpCounterComponent } from './timer/control/warm-up-counter/warm-up-counter.component';
import { CountUpToggleComponent } from './timer/control/count-up-toggle/count-up-toggle.component';
import { KeyPressUntils } from './utils/key-press.util';
import { NumberManipulationUtil } from './utils/number-manipulation.util';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ControlComponent,
    PhaseComponent,
    PhaseCounterComponent,
    RoundCounterComponent,
    WarmUpCounterComponent,
    CountUpToggleComponent
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
    MatInputModule,
    FormsModule,
    MatBadgeModule,
    MatRadioModule
  ],
  providers: [SharedService, KeyPressUntils, NumberManipulationUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
