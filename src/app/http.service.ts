import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './data-models/post.model';
import { User } from './data-models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService { //And AuthenticationService And DataManagementService
    private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";
    private usersUrl: string = "https://jsonplaceholder.typicode.com/users";
    private validUsers: User[]; //fetched userlist to clientside since it's just a simulated login validation. user should be validated in the server.
    user = new BehaviorSubject<User>(null);
    postsEmitter = new Subject<Post[]>();
    posts: Post[];

    constructor(private http: HttpClient) {
        this.fetchUsers();
    }

    fetchArticles() {
        return this.http.get<Post[]>(this.postsUrl).subscribe(response => {
            console.log(response);
            this.posts = response;
            this.postsEmitter.next(response);
        });
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