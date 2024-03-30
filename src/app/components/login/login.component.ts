import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule,Validators,FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
email= new FormControl("",[Validators.required,Validators.email]);
password= new FormControl("",[Validators.required,Validators.minLength(6)]);

loginForm = new FormGroup({
email: this.email,
password: this.password
});
  constructor(private authService:AuthService) { }

  login(){
    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value.email!,this.loginForm.value.password!);
  }
  reset(){
    this.loginForm.reset();
  }
}
