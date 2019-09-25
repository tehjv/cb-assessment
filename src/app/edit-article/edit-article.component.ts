import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpService } from '../http.service';
import { Post } from '../data-models/post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  isValid: boolean = true;
  editMode: boolean = false;
  isLoading: boolean = false;
  id: number;
  userId: number;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      

      this.initForm();
    });
  }

  private initForm() {
    let titleVal = '';
    let bodyVal = '';

    if (this.editMode) {
      const article: Post = this.httpService.getArticle(this.id);
      if (article) {
        titleVal = article['title'];
        bodyVal = article['body'];
      }
    }

    this.articleForm = new FormGroup({
      title: new FormControl(titleVal, [Validators.required]),
      body: new FormControl(bodyVal, [Validators.required])
    });
  }

  getHeader(): string {
    if (!this.id) {
      return 'Create New Post';
    } else {
      return `Editing Post [ID: ${this.id}]`;
    }
  }

  onSubmit() {
    const svc = this.httpService;

    this.isLoading = true;

    const obj: Post = Object.assign({}, this.articleForm.value);
    obj.userId = svc.userId;

    if (this.editMode) {
      obj.id = this.id;
      svc.updateArticle(obj).subscribe(response => {
        console.log(response);
        svc.posts[this.id - 1] = obj; //not refetched since api doesnt really update item
        svc.refreshArticles();
        this.router.navigate(['/articles']);
      });
    } else {
      svc.createArticle(obj).subscribe(response => {
        console.log(response);
        svc.posts[response.id - 1] = response; //not refetched since api doesnt really update item
        svc.refreshArticles();
        this.router.navigate(['/articles']);
      });
    }


    // if (this.httpService.validateUser(this.articleForm.value)) {
    //   // this.router.navigate(['/articles']);
    // } else {
    //   this.isValid = false;
    // }
  }

}
