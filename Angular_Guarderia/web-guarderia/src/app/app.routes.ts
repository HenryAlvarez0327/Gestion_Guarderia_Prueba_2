import { Routes } from '@angular/router';

import { Ninos } from './ninos/ninos';
import { NuevoNino } from './ninos/nuevo-nino/nuevo-nino';

import { Cuidadores } from './cuidadores/cuidadores';
import { NuevoCuidador } from './cuidadores/nuevo-cuidador/nuevo-cuidador';

import { Asignaciones } from './asignaciones/asignaciones';
import { NuevaAsignacion } from './asignaciones/nueva-asignacion/nueva-asignacion';

export const routes: Routes = [
  { path: '', redirectTo: 'ninos', pathMatch: 'full' },

 
  { path: 'ninos', component: Ninos },
  { path: 'ninos/nuevo', component: NuevoNino },
  { path: 'ninos/editar/:id', component: NuevoNino }, 

 
  { path: 'cuidadores', component: Cuidadores },
  { path: 'cuidadores/nuevo', component: NuevoCuidador },
  { path: 'cuidadores/editar/:id', component: NuevoCuidador },

 
  { path: 'asignaciones', component: Asignaciones },
  { path: 'asignaciones/nuevo', component: NuevaAsignacion },
  { path: 'asignaciones/editar/:id', component: NuevaAsignacion },

  { path: '**', redirectTo: 'ninos' }
];