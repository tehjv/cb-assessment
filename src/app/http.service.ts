import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './data-models/post.model';
import { User } from './data-models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService { //And AuthenticationService And DataManagementService
    private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";
    private usersUrl: string = "https://jsonplaceholder.typicode.com/users";
    private validUsers: User[]; //fetched userlist to clientside since it's just a simulated login validation. user should be validated in the server.
    user = new BehaviorSubject<User>(null);
    userId: number;
    postsEmitter = new BehaviorSubject<Post[]>(null);
    posts: Post[];
    storageKey: string = 'user';

    constructor(private http: HttpClient) {
        this.fetchUsers();
    }

    fetchArticles() {
        console.log('fteching for reals')
        return this.http.get<Post[]>(this.postsUrl).subscribe(response => {
            this.posts = response;
            this.postsEmitter.next(response);
        });
    }

    createArticle(post: Post) {
        return this.http.post<Post>(this.postsUrl, post);
    }

    updateArticle(post: Post) {
        return this.http.put<Post>(this.postsUrl + '/' + post.id, post);
    }

    refreshArticles() { //local refresh
        this.postsEmitter.next(this.posts);
    }

    getArticle(id: number): Post {
        return this.posts[id];
    }

    fetchUsers() {
        return this.http.get<User[]>(this.usersUrl).subscribe(response => {
            this.validUsers = response;
        });
    };

    validateUser(user: User): boolean { //is based on the fact that all user data have unique username and email. didn't not disable case-sensitivity.
        const filtered: User[] = this.validUsers.filter(e => e.email === user.email);
        if (filtered.length === 1) {
            const match: User = filtered[0];

            if (match.email === user.email) {
                this.setUser(match);
                this.storeUser(match);
                return true;
            }
        }

        return false;
    }

    checkIfLoggedIn() {
        const user = this.retrieveUser();

        if (user) {
            this.setUser(user);
        }
    }

    private storeUser(user: User) {
        localStorage.setItem(this.storageKey, JSON.stringify(user)); //only for simulation. do not store sentive info in localstorage! 
    }

    private retrieveUser(): User {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    checkEditPermission(post: Post): boolean {
        if (this.userId === post.userId) {
            return true;
        }
        return false;
    }

    checkEditPermissionGuard(id: number): boolean {
        const post = this.posts[id];
        if (!post) {
            return false;
        }
        if (this.userId === post.userId) {
            return true;
        }
        return false;
    }

    private setUser(user: User) {
        this.user.next(user);
        this.userId = user.id;
    }

    logUserOut() {
        localStorage.removeItem(this.storageKey);
        this.user.next(null);
    }
}