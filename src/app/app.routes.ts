import { Routes } from '@angular/router';
import { ToolComponent } from './components/partials/tool/tool.component';
import { BackupListComponent } from './components/pages/backup-list/backup-list.component';
import { ShiftUpdateComponent } from './components/pages/shift-update/shift-update.component';

export const routes: Routes = [
    {path: "", component: ToolComponent},
    {path: "backup", component: BackupListComponent},
    {path: "update", component: ShiftUpdateComponent}
];
