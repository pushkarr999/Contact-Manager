import { Component } from '@angular/core';
import { ApiService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router){}

  registerForm(form:any){
    console.log("This is the form",form)
    const data = {
      username: form.username,
      email: form.email,
      password: form.password
    }

    this.apiService.register(data).subscribe(
      response => {
        alert("You can now login")
        console.log("response",response);
      },
      error => {
        alert("Invalid Data")
        console.error('Error fetching data:', error);
      }
    );
  }

  navigate(){
    this.router.navigateByUrl("/login")
  }
}
