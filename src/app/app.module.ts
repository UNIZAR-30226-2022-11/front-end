import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from './components/juego/juego.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PlayComponent } from './components/play/play.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { HttpClientModule } from '@angular/common/http'
import { TimerComponent } from './components/timer/timer.component';
import { ShopComponent } from './components/shop/shop.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ListComponent } from './components/list/list.component';
import { InventaryComponent } from './components/inventary/inventary.component';
import { MatchHistoryComponent } from './components/match-history/match-history.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ChatComponent } from './components/chat/chat.component';
import { SearchTournamentComponent } from './components/search-tournament/search-tournament.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';

const rutas: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'play'
  },
  {
    path: 'juego',
    component: JuegoComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'play',
    component: PlayComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  }, 
  {
    path: 'chat',
    component: ChatComponent
  }, 
  {
    path: 'inventary',
    component: InventaryComponent
  }, 
  {
    path: 'matchHistory',
    component: MatchHistoryComponent
  },
  {
    path: 'ranking',
    component: RankingComponent
  },
  {
    path: 'searchTournament',
    component: SearchTournamentComponent
  },
  {
    path: 'tournaments',
    component: TournamentsComponent
  }
]

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    FriendListComponent,
    NavigationBarComponent,
    PlayComponent,
    AddFriendComponent,
    TimerComponent,
    ShopComponent,
    ListComponent,
    InventaryComponent,
    MatchHistoryComponent,
    RankingComponent,
    ChatComponent,
    SearchTournamentComponent,
    TournamentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(rutas, {
      paramsInheritanceStrategy:'always'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
