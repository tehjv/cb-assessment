import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/data-models/post.model';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input()
  post: Post;
  canEdit: boolean;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.canEdit = this.httpService.checkEditPermission(this.post);
  }

}
