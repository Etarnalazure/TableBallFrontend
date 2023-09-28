import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private highscoreData: any[] = [];
  private highscoreSubject = new BehaviorSubject<any[]>(this.highscoreData);


    constructor(private apiService: ApiService) {
    this.fetchHighscore();
  }
  getHighscore(): Observable<any[]> {
    return this.highscoreSubject.asObservable();
  }

  private fetchHighscore() {
    this.apiService.getHighScore().subscribe(
      data => {
        this.highscoreData = data;
        console.log('Highscore data:', this.highscoreData);
        this.highscoreSubject.next(this.highscoreData);
      }
    );
  }


  async refreshHighscore() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.fetchHighscore();
  }
}
