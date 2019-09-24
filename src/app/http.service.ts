import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './data-models/post.model';
import { User } from './data-models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class HttpService { //And AuthenticationService
    private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";
    private usersUrl: string = "https://jsonplaceholder.typicode.com/users";
    private validUsers: User[]; //fetched userlist to clientside since it's just a simulated login validation. user should be validated in the server.
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {
        this.fetchUsers();
    }

    fetchArticles() {
        return this.http.get<Post[]>(this.postsUrl);
    }

    createArticle(post: Post) {
        return this.http.put<Post>(this.postsUrl, post);
    }

    updateArticle(post: Post) {
        return this.http.put<Post>(this.postsUrl + post.id, post);
    }

    fetchUsers() {
        return this.http.get<User[]>(this.usersUrl).subscribe(response => {
            this.validUsers = response;
        });
    };

    validateUser(user: User): boolean {
        console.table(this.validUsers);
        if (this.validUsers.map(e => e.email).includes(user.email)) {
            if (this.validUsers.map(e => e.username).includes(user.username)) {
                this.user.next(user);
                return true;
            }
        }
        return false;
    }

    logUserOut() {
        this.user.next(null);
    }
}