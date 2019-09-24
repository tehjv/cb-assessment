import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { Post } from '../data-models/post.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  posts: Post[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.postsEmitter.subscribe(posts => this.posts = posts);
    this.httpService.fetchArticles();
  }

}
