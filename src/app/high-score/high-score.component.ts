import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';
import { DataManagementService } from '../API/data-management.service';

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.scss']
})
export class HighScoreComponent {
  highScore: any[] = [];

  constructor(private apiService: ApiService, private dataManagementService: DataManagementService) { }

  ngOnInit() {
    this.apiService.getHighScore()
      .subscribe((response) => {
        this.highScore = response;
      });
  }
  refreshHighscore() {
    this.dataManagementService.refreshHighscore();
    console.log("highScore", this.highScore);
  }
}
