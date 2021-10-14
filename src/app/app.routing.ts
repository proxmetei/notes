import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from './container/container.component';
import {NotFoundComponent} from './not-found/not-found.component';
const routes: Routes = [
    {
        path: ':data',
        component: ContainerComponent
    },
    {
        path: '**',
        component: ContainerComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {}
