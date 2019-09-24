import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent } from './articles.component'
import { ArticleComponent } from './article/article.component';
import { NgmatModule } from '../ngmat/ngmat.module';

const routes: Routes = [
    { path: '', component: ArticlesComponent }
];

@NgModule({
    declarations: [ArticlesComponent, ArticleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgmatModule
    ],
    exports: [

    ]
})
export class ArticlesModule { }
