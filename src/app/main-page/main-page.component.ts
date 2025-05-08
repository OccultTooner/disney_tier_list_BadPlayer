import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { movieList } from './list_data';
import { CookieService } from 'ngx-cookie-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  imports: [CdkDropList, CdkDrag,NgClass],
})
export class MainPageComponent implements OnInit {
  rankingList = [''];
  AllDisneyMovies = [''];
expression: any;
  //AllDisneyMovies = JSON.parse(JSON.stringify(movieList));

  constructor(private cookieService: CookieService) {
    if (!!this.getCookie('DisneyRankCache')) {
      let temp_list: [] = JSON.parse(this.getCookie('DisneyRankCache'));
      //remove data from list that exist
      let temp_disneyList: [] = JSON.parse(JSON.stringify(movieList));

      temp_list.forEach((item, index) => {
        if (temp_disneyList.indexOf(item) !== -1) {
          temp_disneyList.splice(temp_disneyList.indexOf(item), 1);
        }
      });
      this.AllDisneyMovies = JSON.parse(JSON.stringify(temp_disneyList));

      //add cookie list into rank list
      this.rankingList = JSON.parse(JSON.stringify(temp_list));
    } else {
      this.AllDisneyMovies = JSON.parse(JSON.stringify(movieList));
    }
  }
  ngOnInit(): void {}

  updateCacheList() {
    this.cookieService.set('DisneyRankCache', JSON.stringify(this.rankingList));
  }

  cleanList() {
    this.rankingList = [''];
    this.AllDisneyMovies = JSON.parse(JSON.stringify(movieList));
    this.cookieService.delete('DisneyRankCache');
  }
  downloadList() {
    let element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8, ' + encodeURIComponent(JSON.stringify(this.rankingList))
    );
    element.setAttribute('download','rankList');
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  drop(event: CdkDragDrop<string[]>) {
    //remove blank
    if (this.rankingList.indexOf('') !== -1) {
      this.rankingList.splice(this.rankingList.indexOf(''), 1);
    }
    //
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.updateCacheList();
  }
}
