import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _apiservice : ApiCallService,public router:Router) { }
a:any;
  ngOnInit() {
  }
image(data)
{
this._apiservice.images(data).subscribe();
}

details(event)
    {
      this.a=event.target.files[0].size;
      this.a=Math.round(this.a/1024);
     
      if(this.a>100){
        document.getElementById('error').innerHTML="Size should be less than 100kb"
      }
      else{
        document.getElementById('error').innerHTML=""
      }
    }

    Viewlists()
    {
      this._apiservice.list_data().subscribe((response)=>console.log(response));
      this.router.navigate(['viewlist']);
    }
}
