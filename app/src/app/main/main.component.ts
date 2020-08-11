import { Component, OnInit, Renderer2, ElementRef, ViewChild, QueryList } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dragPosition = {x: 0, y: 0};
  hello:any
  token:any;
  title = 'app';
  a: any;
  text:any;
  @ViewChild('div', { static: true }) div: ElementRef
  
  constructor(private jwtHelper:JwtHelperService,private _apiservice:ApiCallService,public router:Router,private renderer: Renderer2){}
  ngOnInit()
  {
    sessionStorage.removeItem("token");
  }
   p: HTMLParagraphElement
add(data)
{

  


  this.p = this.renderer.createElement('p');

  if(data=="name"){
  this.p.innerHTML = "<label>Enter Name</label><br><input type='text' placeholder='First Name' name='name' (change)='test($event)'><br><input type='text' placeholder='Last Name'>"

}
  else if(data=="password")
    {
    this.p.innerHTML = "Enter Password<br><input type='password' placeholder='Password'><br><input type='password' placeholder='Confirm Password'>"
    }
    else if(data=="email"){
      this.p.innerHTML = "Enter Email<br><input type='email' placeholder='email' name='email' ngModel>"
      }
      else if(data=="phone"){
        this.p.innerHTML = "Enter Phone.no<br><input type='number' placeholder='phone' name='phone' ngModel>"
        }
        else{
         this.p.innerHTML = "Enter DOB<br><input type='date'>"
          }
  this.renderer.appendChild(this.div.nativeElement,this.p)
  
}

test(data)
{console.log(data);}


  signup(data)
  {
    this._apiservice.details(data).subscribe();
  }
  submit(data)
  {
    this._apiservice.login(data).subscribe((response)=>{
     if(response.result[0].length>0)
       {
         sessionStorage.setItem('token',response.token);
       
        response=response.result[0];
         localStorage.setItem('id',response[0].id);
         this.router.navigate(['/dashboard']);
    
         const token: string = localStorage.getItem("token");
    
         if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
       
    }
    else {
      return false;
    }
        }
       else
       {
         alert("Wrong id or password");
       }
       
      },(error) => {
      console.log('error is ', error)
  });
    
  }

}
