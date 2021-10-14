import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newnodes';
  param = {value: 'world'};
   alph="abcdefghigklmnopqrstuvwxyz";
  findnum(word: string):number
  {
      for(let i=0;i<this.alph.length;i++)
      {
        if(word==this.alph[i])
        return i;
      }
  }
   
  constructor(public translate: TranslateService) {
      translate.use('en');

  }
}
