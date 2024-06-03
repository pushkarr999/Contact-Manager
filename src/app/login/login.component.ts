import { Component } from '@angular/core';
import { ApiService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private apiService: ApiService, private router: Router){}

  loginForm(form:any){
    console.log("This is the form",form)
    const data = {
      email: form.email,
      password: form.password
    }

    this.apiService.login(data).subscribe(
      response => {
        console.log("response",response);
        localStorage.setItem('token',response.accessToken);
        this.router.navigateByUrl('/list')
      },
      error => {
        alert("Invalid Credentials")
        console.error('Error fetching data:', error);
      }
    );
  }

  navigate(){
    this.router.navigateByUrl("/register")
  }
}
