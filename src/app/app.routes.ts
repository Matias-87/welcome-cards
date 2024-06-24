import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor/editor.component';
import { CustomCardComponent } from './custom-card/custom-card.component';

export const routes: Routes = [
    { path: '', component: EditorComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'custom-card/:card-id', component: CustomCardComponent },
    { path: '**', redirectTo: '' }
];
