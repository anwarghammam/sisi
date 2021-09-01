import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as ChartAnnotation from "chartjs-plugin-annotation";

import {forkJoin} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})


export class InfoComponent implements OnInit {
  


	@ViewChild('googlechart')
	googlechart: GoogleChartsModule;
  chartanno=ChartAnnotation
  chart1 = {
		title: 'Total memory',
		type: 'Gauge',
		data:[ ["memory",0
      
     
		
		]],
		options: {
			width: 400,
      height: 150,
      greenFrom: 0,
			greenTo: 75,
			redFrom: 90,
			redTo: 100,
			yellowFrom: 75,
			yellowTo: 90,
      minorTicks: 5,
      majorTicks: ['0%', '100%']
			
     
    }}
    chart2 = {
      title: 'Total CPU',
      type: 'Gauge',
      data:[ [
        'disk',0,
       
      
      ]],
      options: {
        width: 400,
        height: 150,
        
        greenFrom: 0,
        greenTo: 75,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
       
       
        
       
      }}
      chart3 = {
        title: 'services',
        type: 'Gauge',
        data:[ [
          'services',0,
          
        
        ]],
        options: {
          width: 400,
          height: 150,
         
          blueFrom: 0,
          blueTo: 100,
          
          minorTicks: 5
          
         
        }}
        chart4 = {
          title: 'number of containers',
          type: 'Gauge',
          data:[ [
            'containers',0,
            
          
          ]],
          options: {
            width: 400,
            height: 150,
           
            blueFrom: 0,
            blueTo: 100,
            
            minorTicks: 5
            
           
          }}
       
  public node =0
  public services
  public available_mem
  public available_disk
  public con
  public total_containers:number=0
  public total_memory
  public total_disque
  public data1=[]
  public consumed_mem
  public consumed_cpu
  public data3=[]
  public total_resources=[]
  public info =[]
  public nodes_ids=[]
  public nodes_names=[]
  public total_cpu
  public total_mem
  public pieChartData=[3,3,3,3,3,3]
  infos:JSON[]
  public data= [];
 public names=[]


  
  constructor(private api: ApiService) { 
   
  }
  

  ngOnInit() {
    this.nb_info()
   
  this.nb_total_dis() 
  
 
   
  this.nb_services() 
  this.nb_total_mem()  
  this.get_available_mem()
  this.get_available_disk()
 
  
        }
    
        consumed_ressources()
        
        {

          
          this.data1.forEach(val=>{
            
            forkJoin([this.api.consumed_mem_node(String(val[1])), 
            this.api.consumed_cpu_node(String(val[1]))]).subscribe(data => {
 
             this.consumed_mem=parseFloat(data[0].body['data']['result']['0']['value']['1']);
 
              this.consumed_cpu=parseFloat(data[1].body['data']['result']['0']['value']['1']);
              this.data3.push(
                [String(val[0]),this.consumed_cpu, this.consumed_mem])
           });




           forkJoin([this.api.total_cpu_node(String(val[1])), 
           this.api.total_mem_node(String(val[1]))]).subscribe(data => {

            this.total_cpu=parseFloat(data[0].body['data']['result']['0']['value']['1']);

             this.total_mem=parseFloat(data[1].body['data']['result']['0']['value']['1']);
             this.total_resources.push(
               [String(val[0]),this.total_cpu, this.total_mem])
          });
                
                        
                        })
                     
            console.log(this.data3)
           
        }
        nb_con(){
         console.log(this.data1)
         
          this.data1.forEach(val=>{
            
            this.pieChartData=[]
           this.api.nb_con_node(String(val[1]))
           .subscribe(
             resp => {
               
                 this.con=resp.body['data']['result']['0']['value']['1'];
                 this.names.push(val[0])
                 this.total_containers+=parseInt(resp.body['data']['result']['0']['value']['1']);
                 console.log("total containers  "+ this.total_containers)
                 this.pieChartData.push(this.con)
                 this.data.push([val[1],this.con])
                 
                 this.chart4.data= [['number of containers',this.total_containers]]
                   
               })
              ;})
              console.log("total containers  "+ this.total_containers)
             
    

              
         }
  
  number_node(){
    this.api.getnb_nodes().subscribe(
      resp => {
          this.node=resp.body['data']['result']['0']['value']['1'];
        });
      
  }
  nb_services(){
    this.api.getnb_services()
      .subscribe(
        resp => {
            
            this.services=parseFloat(resp.body['data']['result']['0']['value']['1']);
            this.services=this.services
            this.chart3.data= [['nb services',this.services]]
        
          });

  }
  get_available_mem(){
    this.api.get_available_mem()
    .subscribe(
      resp => {
       
          this.available_mem=100-parseFloat(resp.body['data']['result']['0']['value']['1']);
     
      this.chart1.data= [['consumed Memory',this.available_mem]]
        });
     
  }
  get_available_disk(){
    this.api.get_available_disk()
    .subscribe(
      resp => {
       
          this.available_disk=parseFloat(resp.body['data']['result']['0']['value']['1']);
        
          this.chart2.data= [['consumed CPU',this.available_disk]]
        });

  }
 
  nb_info(){
    this.api.nb_info()
    .subscribe(
      resp => {
        this.info=resp.body['data']['result']
        
       for (var val of this.info){
         
        this.nodes_ids.push(val['metric']['node_id'])
        this.nodes_names.push(val['metric']['node_name'])
        this.data1.push([val['metric']['node_name'],val['metric']['node_id'],val['metric']['instance']])
      }
      this.consumed_ressources()
        this.nb_con()
       
        });
       
      console.log(this.data1)
    
    
    
  }
  nb_total_mem(){
    this.api.nb_totalmem()
    .subscribe(
      resp => {
      
         this.total_memory=parseFloat((resp.body['data']['result']['0']['value']['1']));
        
        
        });

  }
  
  nb_total_dis(){
    this.api.nb_total_disk()
    .subscribe(
      resp => {
        
         this.total_disque=parseFloat(resp.body['data']['result']['0']['value']['1']);
          console.log("cpu")
          console.log(this.total_disque)
        });

  }
  
  public pieChartOptions: ChartOptions = {
    title: {
      text: 'number of containers per node',
      display: true
    },
    responsive: true,
  };
  public pieChartLabels: Label[] = this.names;
  public pieChartType:string = 'pie';
  public pieChartLegend = true;
  
  public pieChartPlugins = [];



  /*  */
  title = 'number of containers per node';
   type = 'PieChart';
   
   columnNames = ['Browser', 'Percentage'];
   options = {    
   };
   width = 400;
   height = 400;




   /*table*/
   title1 = "cluster members";
   type1 = 'Table';
   
   columnNames1=["node_name", "node_id","instance"];
   options1 = { 
     alternatingRowStyle:true,
     showRowNumber:true  
   };
   
   width1 = 400;
   height1 = 200;

    /*table2*/
    title2 = "total ressources";
    type2 = 'Table';
    
    columnNames2=["node_name", "Total Cpu (cores)","Total Memory (GB)"];
    options2 = { 
      alternatingRowStyle:true,
      showRowNumber:true  
    };
    
    width2 = 400;
    height2 = 200;



   /* bars*/
   title3 = '% resources consumption per node';
   type3= 'ComboChart';

   columnNames3 = ['ressources','cpu','mem'];
   options3 = {   
      hAxis: {
         title: 'node'
      },
      vAxis:{
         title: '% of consumption'
      },
      seriesType: 'bars',
     
      
   };
   width3 = 550;
   height3 = 200;





   
}



