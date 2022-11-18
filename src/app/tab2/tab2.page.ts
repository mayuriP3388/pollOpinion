import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  polls =[
    {
      "poll": {
          "pollId": 2,
          "userId": 2,
          "question": "your favourite colour",
          "createdAt": "2022-11-18T16:06:16.000+00:00",
          "published": true,
          "user":"aman"
      },
      "pollAnswers": [
          {
              "pollAnswerId": 4,
              "pollId": 2,
              "optionName": "red",
              "votes": 0
          },
          {
              "pollAnswerId": 5,
              "pollId": 2,
              "optionName": "yellow",
              "votes": 1
          },
          {
              "pollAnswerId": 6,
              "pollId": 2,
              "optionName": "black",
              "votes": 0
          }
      ]
  }
  ];
}
