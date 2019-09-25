import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isValid: boolean = true;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, [Validators.required])
    });

    // this.loginForm.statusChanges.subscribe(
    //   status => {
    //     console.log(status)
    //     console.log()
    //     if (status === 'INVALID') {
    //       this.isValid = false;
    //     } else {
    //       this.isValid = true;
    //     }
    //   }
    // );
  }

  onSubmit() {
    if (this.httpService.validateUser(this.loginForm.value)) {
      this.router.navigate(['/articles']);
    } else {
      this.isValid = false;
    }
    // this.loginForm.reset();
  }
}
