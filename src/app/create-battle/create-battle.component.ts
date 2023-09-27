import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-create-battle',
  templateUrl: './create-battle.component.html',
  styleUrls: ['./create-battle.component.scss']
})
export class CreateBattleComponent {
  teams: any[] = [];
  teamOneGuid:string = '';
  teamTwoGuid:string = '';
  winner:string = '';
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.GetEntries();
      
  }
  GetEntries()
  {
    this.apiService.getTeams()
    .subscribe((response) => {
      this.teams = response;
    });
  }
  isOptionDisabled(teamName: string, uniqueTeamGuid: string): boolean {
    if ((teamName === 'teamOneGuid' && this.teamOneGuid === uniqueTeamGuid) ||
        (teamName === 'teamTwoGuid' && this.teamTwoGuid === uniqueTeamGuid)) {
      return true; // Disable the option
    }
    return false; // Enable the option
  }

  BattleTime()
  {
    
    const findWinnerIndex = this.teams.findIndex(team => team.uniqueTeamGuid === this.getRandomWinner(this.teamOneGuid,this.teamTwoGuid));
    this.winner = this.teams[findWinnerIndex].teamName;
  }

  getRandomWinner(TeamOne: any, TeamTwo: any): any {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return [TeamOne, TeamTwo][randomIndex];
  }
}
