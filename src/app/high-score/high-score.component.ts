import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.scss']
})
export class HighScoreComponent {
  highScore: any[] = [];
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getHighScore()
      .subscribe((response) => {
        this.highScore = response;
      });
      console.log("Htest ", this.highScore);
  }
}
