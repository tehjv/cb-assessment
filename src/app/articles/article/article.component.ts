import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/data-models/post.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input()
  post:Post;
  
  constructor() { }

  ngOnInit() {
  }

}
