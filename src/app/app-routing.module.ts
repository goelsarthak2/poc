import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsersComponent } from './shared/users/users.component';
import { CallComponent } from './shared/call/call.component';
import { ListOfActComponent } from './shared/list-of-act/list-of-act.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthService } from './shared/services/validation.service';
import { 
    AuthGuardService as AuthGuard 
  } from './shared/services/validation-auth.service';

const routes: Routes = [  
   { path: 'users', component: UsersComponent,  canActivate: [AuthGuard],runGuardsAndResolvers: 
  'always'   },   
   { path: 'call', component: CallComponent,  canActivate: [AuthGuard] },
   { path: 'call/:name', component: CallComponent,  canActivate: [AuthGuard] },
   { path: 'call/:name/:fromListOfAct', component: CallComponent,  canActivate: [AuthGuard] }, 
   { path: 'answerCall', component: CallComponent , canActivate: [AuthGuard] },
   { path: 'listOfAct', component: ListOfActComponent,  canActivate: [AuthGuard] },
   { path: 'login', component: LoginComponent,  },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload', useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
