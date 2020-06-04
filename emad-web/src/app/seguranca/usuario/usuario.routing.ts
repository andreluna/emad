import { Routes } from "@angular/router";
import { UsuarioFormComponent } from "./usuario-form.component";
import { UsuarioComponent } from "./usuario.component";

export const usuarioRoutes: Routes = [
    {
        path: '',
        component: UsuarioComponent,        
    },
    {
        path: 'cadastro',
        component: UsuarioFormComponent,        
    },
    {
        path: 'cadastro/:id',
        component: UsuarioFormComponent,        
    }
];