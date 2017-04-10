
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventdetailComponent } from '../view/eventdetail/eventdetail.component';
import { EventlistComponent } from '../view/eventlist/eventlist.component';
import { EventsetupComponent } from '../view/eventsetup/eventsetup.component';
import { LoginComponent } from '../view/login/login.component';
import { MagiclinkComponent } from '../view/login/magiclink/magiclink.component';
import { MagiclinkRedirectComponent } from '../view/login/magiclink/magiclink-redirect/magiclink-redirect.component';
import { AuthGuard } from '../_guard/auth.guard';
import { AuthGuardAdmin } from '../_guard/authAdmin.guard';


@NgModule({
  imports: [
    RouterModule.forRoot([
{
  path: '',
  component: EventlistComponent,
  canActivate: [AuthGuard],
}, {
  path: 'archiv',
  component: EventlistComponent,
  canActivate: [AuthGuard],
}, {
  path: 'event/edit/:id',
  component: EventdetailComponent,
  canActivate: [AuthGuardAdmin],
}, {
  path: 'event/new',
  component: EventsetupComponent,
  canActivate: [AuthGuardAdmin],
}, {
  path: 'event/:id',
  component: EventdetailComponent,
  canActivate: [AuthGuard]
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'magiclink',
  component: MagiclinkComponent
}, {
  path: 'magiclink/:user/:token',
  component: MagiclinkRedirectComponent
}, {
  path: '**',
  redirectTo: '/'
}
])
],
exports: [
  RouterModule
  ]
})
export class AppRoutingModule {}
