import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {Service} from './pages/service/service'; 
import {Contact} from './pages/contact/contact'; 
import {Distrilion} from './pages/distrilion/distrilion';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  {path: 'register', component: Register},
  {path: 'service', component: Service},
  {path: 'contact', component: Contact},
  {path: 'distrilion', component: Distrilion}
];