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
  winnerGuid:string = '';

  previousBattles: any[] = [];
 
  teamBattles: any[] = [];
  
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
    this.apiService.getBattles()
    .subscribe((response) => {
      this.previousBattles = response;
      this.processBattles();
    });

  }

  private processBattles() {
    // Check if both teams and battles are available
    if (this.teams && this.previousBattles) {
      // Process battles and populate teamBattles array
      this.teamBattles = this.previousBattles.map(battle => {
        
        const team1 = this.teams.find(team => team.uniqueTeamGuid === battle.teamOneGuid);
        const team2 = this.teams.find(team => team.uniqueTeamGuid === battle.teamTwoGuid);
        const battleDate = battle.battleDate;
        console.log("team1", team1);
        console.log("team2", team2);
        return {
          team1Name: team1 ? team1.teamName : 'Unknown Team',
          team2Name: team2 ? team2.teamName : 'Unknown Team',
          battleDate: battleDate
        };
      });
  
      console.log("Battles", this.teamBattles);
    }
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
    this.winnerGuid = this.teams[findWinnerIndex].uniqueTeamGuid;
    this.apiService.createBattle(this.teamOneGuid, this.teamTwoGuid,this.winnerGuid).subscribe(
      response => {
        console.log('Data received:', response);
      });
  }

  getRandomWinner(TeamOne: any, TeamTwo: any): any {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return [TeamOne, TeamTwo][randomIndex];
  }
}
