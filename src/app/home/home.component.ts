import { Component, OnChanges, OnInit, SimpleChanges, ɵɵNgOnChangesFeature } from '@angular/core';
import { ApiService } from '../api.service';

declare var all: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  containers_energy
  
  constructor(private api: ApiService) {
    
   }
  

  ngOnInit() {
   
   
      this.api.energy()
      .subscribe(
        resp => {
          
          this.containers_energy=resp['body']['containers']
          let url=""
          this.api.all_current_data.forEach(node => {
          url=url+String(node[1])+'||'
    
});
           console.log(url)   
          all(this.containers_energy,this.api.all_current_data,url)  
          console.log(this.api.all_current_data)
      
  })}
    
  
    
    
  
  }
  


    


