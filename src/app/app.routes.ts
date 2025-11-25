import { Routes } from '@angular/router';
import { CollecationComponent } from '../collecation/collecation.component';
import { ComplainComponent } from './complain/complain.component';
import { DashboardComponent } from './complain/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: CollecationComponent },
  { path: 'complain', component: ComplainComponent },
  { path: 'dashboard', component: DashboardComponent },
];
