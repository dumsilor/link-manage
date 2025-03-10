import { Routes } from '@angular/router';
import { BackupListComponent } from './components/pages/backup-list/backup-list.component';
import { ShiftUpdateComponent } from './components/pages/shift-update/shift-update.component';
import { NoMansLandComponent } from './components/pages/no-mans-land/no-mans-land.component';
import { ToolListComponent } from './components/pages/tool-list/tool-list.component';
import { LoginComponent } from './components/pages/login/login.component';
import { BitComponent } from './components/pages/bit/bit.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "backup", component: BackupListComponent},
    {path: "update", component: ShiftUpdateComponent},
    {path: "creds", component: ToolListComponent },
    {path: "login", component: LoginComponent },
    {path: 'bits', component: BitComponent},
    {path: "**", component: NoMansLandComponent},
];
