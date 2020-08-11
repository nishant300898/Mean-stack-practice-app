import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService implements CanActivate{
url='http://localhost:3000/';
  constructor(private http : HttpClient , private jwtHelper: JwtHelperService,public router:Router) { }
login_details:any
login_id=localStorage.getItem('id');
category_details:any;

canActivate()
{

  const token = sessionStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }


  details(data):Observable<any>
  {
    this.login_details=[data.name,data.password]

    return this.http.post(this.url,{'firstName' : data.name, 'Password' : data.password});
  }

  login(data):Observable<any>
  {
    this.login_details=[data.name,data.password]
    return this.http.get(this.url+'login'+this.login_details);
  }

  images(data):Observable<any>
  {
    data['id']=this.login_id;
    return this.http.post(this.url+'image',{'data':data});
  }

  list_data():Observable<any>
  {
    return this.http.get(this.url+'list_details'+this.login_id);
  }
}
