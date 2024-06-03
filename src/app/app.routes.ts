import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor/editor.component';

export const routes: Routes = [
    {path: '', component: EditorComponent},
    { path: 'editor', component: EditorComponent},
    {path: '**', redirectTo: ''}
];
