import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FieldListComponent} from './components/fields/field-list/field-list.component';
import {FieldFormComponent} from './components/fields/field-form/field-form.component';
import {FieldViewComponent} from './components/fields/field-view/field-view.component';
import {AuthGuardService} from '../core/services/auth-guard.service';

const routes: Routes = [
    {path​: 'dashboard/fields'​, component​: FieldListComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard/fields/view/:id', component: FieldViewComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard/fields/add', component: FieldFormComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard/fields/edit/:id', component: FieldFormComponent, canActivate: [AuthGuardService]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitorRoutingModule { }
