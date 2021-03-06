import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { App } from 'ionic-angular';
import { PertainHomePage } from '../pertain-home/pertain-home';
import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { PayPage } from '../pay/pay';
import { FixPage } from '../fix/fix';
import { RepairPage } from '../repair/repair';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myplace : string;
  params;
  cityname="";
  constructor(public navCtrl: NavController,private app:App, public navParams: NavParams,public events:Events) {
    this.params= navParams.get('mycity');
    this.cityname=this.params;
  }
   home_button1=[
    {src:'assets/imgs/home_01.png'},
    {src:'assets/imgs/home_02.png'},
    {src:'assets/imgs/home_03.png'},
    {src:'assets/imgs/home_07.png'}
  ]
  annex(id){
    if(id==0){
      this.app.getRootNav().push(AboutPage);
    }
    else if(id==1){
      this.app.getRootNav().push(PayPage);
    }
    else if(id==3){
      this.app.getRootNav().push(FixPage);
    }
    else if(id==2){
      this.app.getRootNav().push(RepairPage);
    }
  }
  goMap(){
    console.log('map');
    this.navCtrl.push(MapPage);
  }

}
