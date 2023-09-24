import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  players: any[] = [];
  TeamName: string = '';
  PlayerOne: string = '';
  PlayerTwo: string = '';
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getPlayers()
      .subscribe((response) => {
        this.players = response;
      });
      console.log("Htest ", this.players);
  }
}
