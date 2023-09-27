import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CreateTeamComponent } from './create-team/create-team.component';
import { TileMenuComponent } from './tile-menu/tile-menu.component';
import { HighScoreComponent } from './high-score/high-score.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { CreateBattleComponent } from './create-battle/create-battle.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTeamComponent,
    TileMenuComponent,
    HighScoreComponent,
    CreatePlayerComponent,
    CreateBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
