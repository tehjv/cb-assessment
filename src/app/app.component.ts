import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assessment';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.checkIfLoggedIn();
    if (!this.httpService.posts) { //only for demo-ing route guard for supposedly uneditable post ids
      console.log('fetching')
      this.httpService.fetchArticles();
    }
  }
}
