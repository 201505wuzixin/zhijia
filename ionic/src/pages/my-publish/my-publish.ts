import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


/**
 * Generated class for the MyPublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-publish',
  templateUrl: 'my-publish.html',
})
export class MyPublishPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http:Http
  ) {
  }

  publish = []

  ionViewDidEnter() {

    this.http.get('http://localhost:7000/api/v1/content/',{}).subscribe(data=>{
      this.publish = JSON.parse(data['_body']).data;
      // console.log(this.publish.length)

      //昵称转换author-->username
      for (let i = 0; i < this.publish.length; i++) {
        let id = this.publish[i].author
        let token = localStorage.getItem('user_token')
        this.http.get('http://localhost:7000/api/v1/user/' + id + '?token=' + token
          , {}).subscribe(data => {
            this.publish[i].name = JSON.parse(data['_body']).data.name
            this.publish[i].icon = '/assets/imgs/user.jpg'
          }, err => {
            console.log(err);
          });
      }
      for (let i = 0; i < this.publish.length; i++) {
        if (this.publish[i].author == localStorage.getItem('user_id')) {
          this.myPublish.unshift(this.publish[i])
        }
      }

      console.log(this.myPublish);
    })

    // setTimeout(() => {
    //   console.log(this.publish)
    //   for (let i = 0; i < this.publish.length; i++) {
    //     if (this.publish[i].author == localStorage.getItem('user_id')) {
    //       this.myPublish.unshift(this.publish[i])
    //     }
    //   }
    // }, 100);
    

  }

  myPublish = [
    // {icon:'assets/publish/mht.jpg',name:'Ma',created:'2018-6-1',pic:'assets/publish/main.jpg',title:'我发布的',comments:'3',up:'3'}
  ]
  

  del(id){
    
    this.http.post('http://localhost:7000/api/v1/content/'+ this.myPublish[id]._id +'/destroy', {
      token: localStorage.getItem('user_token')
    }).subscribe(data => {
      // console.log(JSON.parse(data['_body']));
      this.myPublish.splice(id,1)
    }, err => {
      console.log(err);
    });
  }
}
