import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  players: any[] = [];
  teams: any[] = [];
  teamName: string = '';
  playerOne: string = '';
  playerTwo: string = '';
  teamGuid: string = '';
  Response: any = '';
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.GetEntries();
      
  }
  GetEntries()
  {
    this.apiService.getPlayers()
    .subscribe((response) => {
      this.players = response;
    });
    
    this.apiService.getTeams()
    .subscribe((response) => {
      this.teams = response;
      console.log("Teams", this.teams, response);
    });
  }
  isOptionDisabled(player: string, uniquePlayerGuid: string): boolean {
    if ((player === 'playerOne' && this.playerTwo === uniquePlayerGuid) ||
        (player === 'playerTwo' && this.playerOne === uniquePlayerGuid)) {
      return true; // Disable the option
    }
    return false; // Enable the option
  }

  onSubmit() {
    console.log(this.teamName, this.playerOne, this.playerTwo);
    this.apiService.createTeam(this.teamName, this.playerOne, this.playerTwo).subscribe(
      response => {
        console.log('Data received:', response);
      });
    this.Response = "Team created successfully:";
  }

  onDeleteSubmit() {
    console.log("TeamGuid", this.teamGuid);
    this.apiService.deleteTeam(this.teamGuid).subscribe(
      response => {
        console.log('Data received:', response);
      });
    const indexToRemove = this.teams.findIndex(team => team.uniqueTeamGuid === this.teamGuid);

    // Check if the player was found in the array
    if (indexToRemove !== -1) {
      // Remove the player from the array
      this.teams.splice(indexToRemove, 1);
    };
    this.Response = "Team deleted successfully:";
    
  }
}
