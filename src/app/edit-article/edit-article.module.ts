import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EditArticleComponent } from './edit-article.component';

const routes: Routes = [
    { path: '', component: EditArticleComponent }
];

@NgModule({
    declarations: [EditArticleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [

    ]
})
export class EditArticleModule { }
