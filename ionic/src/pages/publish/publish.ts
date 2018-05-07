import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { PublishNewPage } from '../publish-new/publish-new';
import { PublishMainPage } from '../publish-main/publish-main';

/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events:Events,
    private app:App
  ) {
    // 接收发布页面数据
    events.subscribe('user:created',(textarea,time) => {
      var theTime = this.timestampToTime(time);
      this.publish.unshift({
        icon:'assets/publish/zhijia.png',name:'知家官方团队',
        time:theTime,pic:'',article:textarea,good:0
      });
      console.log(this.publish);
      // this.isGood = isSecondary;
    })
  }

  // 搜索框
  mySea = false;
  mySearch(){
    if(this.mySea == false){
      this.mySea = true;
    }else{
      this.mySea = false;
    }
    
  }

  //默认帖子数据
  publish=[
    {
      icon:'assets/publish/mht.jpg',name:'Pony Ma',time:'2018年5月2日',
      pic:'assets/publish/main.jpg',article:'来充钱啊不充钱你怎么变得更强！！！',
      good:6
    },{
      icon:'assets/publish/my.jpg',name:'Jack Ma',time:'2018年5月2日',
      pic:'assets/publish/alibaba.jpg',article:'我对钱没有兴趣！我最后悔的就是创立了阿里巴巴！！',
      good:8
    }
  ]

  //点击发布按钮
  myPub(i){
    this.app.getRootNav().push(PublishNewPage);
  }
  //点击评论按钮
  myComment(){
    this.app.getRootNav().push(PublishNewPage);
  }
  //点击进入详情,发送数据到详情页publish-main
  pubMain(id){
    this.app.getRootNav().push(PublishMainPage,{
      publish:this.publish[id],isGood:this.isGood
    });
  }

  //点赞
  isGood:boolean=true;
  goodColor = {
    'color': this.isGood ? '#ccc' : '#FFBB00'
  }
  isGoodSwitch(id){
    if(this.isGood==true){
      console.log(this.isGood);
      this.goodColor = {
        'color': '#FFbb00'
      }
      this.isGood=false;
      this.publish[id].good++;
    }else{
      console.log(this.isGood + 'else');
      this.goodColor = {
        'color': '#ccc'
      }
      this.isGood=true;
      this.publish[id].good--;
    }
  }
  
  
  //时间戳转换时间
  timestampToTime(timestamp) {
    var date = new Date(timestamp);
    // var Y = date.getFullYear() + '年';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = date.getDate() + '日 ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    // var s = date.getSeconds();
    return M + D + h + m ;
  }

}
