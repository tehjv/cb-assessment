import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isValid: boolean = true;
  constructor(private httpService: HttpService) { }

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
    console.log(this.loginForm.value)
    if (this.httpService.validateUser(this.loginForm.value)) {
      console.log("VALIDDDD")
    } else {
      this.isValid = false;
    }
    // this.loginForm.reset();
  }
}
