import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './core/app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { EventsService } from './services/events.service';
import { GuestlistService } from './services/guestlist.service';
import { AuthGuard } from './_guard/auth.guard';
import { AuthGuardAdmin } from './_guard/authAdmin.guard';
import { AuthenticationService} from './services/authentication.service';

import { AppRoutingModule } from './core/app-routing.module';
import { EventlistComponent } from './view/eventlist/eventlist.component';
import { EventCardComponent } from './view/eventlist/event-card/event-card.component';
import { EventdetailComponent } from './view/eventdetail/eventdetail.component';
import { LoginComponent } from './view/login/login.component';
import { MagiclinkComponent } from './view/login/magiclink/magiclink.component';
import { GuestlistComponent } from './guestlist/guestlist.component';
import { EventsetupComponent } from './view/eventsetup/eventsetup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventlistComponent,
    EventCardComponent,
    EventdetailComponent,
    LoginComponent,
    MagiclinkComponent,
    GuestlistComponent,
    EventsetupComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthGuardAdmin,
    AuthenticationService,
    Title,
    EventsService,
    GuestlistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
