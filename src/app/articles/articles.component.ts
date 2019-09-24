import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { Post } from '../data-models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface SearchField {
  key: string;
  label: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  searchFields: SearchField[] = [
    { label: 'ID', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'User ID', key: 'userId' }
  ]
  posts: Post[];
  allPosts: Post[];
  searchForm: FormGroup;
  filtered: boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'keyword': new FormControl(null, [Validators.required]),
      'field': new FormControl('id')
    });
    this.httpService.postsEmitter.subscribe(posts => {
      this.posts = posts;
      this.allPosts = posts;
    });
    this.httpService.fetchArticles();
  }

  onSubmit() {
    console.log(this.searchForm.value)
    this.posts = this.allPosts.filter(e => e[this.searchForm.value.field] == this.searchForm.value.keyword);
    this.filtered = true;
  }

  getResultTxt(): string {
    const length = this.posts.length;
    if (length > 0) {
      return "Found: " + length;
    }
    return "Nothing found!";
  }

  onClearFilter() {
    this.posts = this.allPosts;
    this.filtered = false;
  }
}
