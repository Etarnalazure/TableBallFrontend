import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';
import { DataManagementService } from '../API/data-management.service';

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
  
  constructor(private apiService: ApiService, private dataManagementService: DataManagementService) { }
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

  private async processBattles() {
    // Check if both teams and battles are available
    if (this.teams && this.previousBattles) {
      // Process battles and populate teamBattles array
      this.teamBattles = this.previousBattles.map(battle => {
        
        const team1 = this.teams.find(team => team.uniqueTeamGuid === battle.teamOneGuid);
        const team2 = this.teams.find(team => team.uniqueTeamGuid === battle.teamTwoGuid);
        const battleWinner = this.teams.find(team => team.uniqueTeamGuid === battle.winnerGuid);
        const battleDate = battle.battleDate;

        return {
          team1Name: team1 ? team1.teamName : 'Unknown Team',
          team2Name: team2 ? team2.teamName : 'Unknown Team',
          battleDate: battleDate,
          battleWinner: battleWinner ? battleWinner.teamName : 'Unknown Team'
        };
      });
      //Sort by date
      this.teamBattles.sort((a, b) => {
        const dateA = new Date(a.battleDate);
        const dateB = new Date(b.battleDate);
      
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
    }
  }
  //Not sure why the solution made for the team component didnt work here
  //TODO: Research later.
  isOptionDisabled(teamName: string, uniqueTeamGuid: string): boolean {
    if (teamName === 'teamOneGuid' && this.teamTwoGuid === uniqueTeamGuid) {
      return true; // Disable the option
    }
  
    if (teamName === 'teamTwoGuid' && this.teamOneGuid === uniqueTeamGuid) {
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
      this.dataManagementService.refreshHighscore();
  }
  RigBattle()
  {
    this.apiService.createBattle(this.teamOneGuid, this.teamTwoGuid,this.winnerGuid).subscribe(
      response => {
        console.log('Data received:', response);
      });
      this.dataManagementService.refreshHighscore();
  }

  getRandomWinner(TeamOne: any, TeamTwo: any): any {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return [TeamOne, TeamTwo][randomIndex];
  }
}
