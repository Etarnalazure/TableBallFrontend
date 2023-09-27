import { Component, ChangeDetectorRef  } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent {
  players:any[] = [];
  playerName:string = '';
  playerInitials:string = '';
  playerGuid:string = '';
  Response: any = '';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
   
    this.GetEntries();
  }

  GetEntries()
  {
    this.apiService.getPlayers()
    .subscribe((response) => {
      this.players = response;
    });
   this.RefreshPage();
  }
  
  RefreshPage() {
    // Trigger change detection to update the UI
    this.cdr.detectChanges();
  }

  GetPlayerValues()
  {
    this.apiService.getPlayerById(this.playerGuid).subscribe(
      response => {
        console.log('Data received:', response);
        this.playerName =response.playerName;
        this.playerInitials = response.playerInitials;
      });
    
  }

  onCreateSubmit() {
    this.apiService.createPlayer(this.playerName, this.playerInitials).subscribe(
      response => {
        console.log('Data received:', response);
      });
    this.Response = "Player created successfully:";
  }
  onChangeSubmit() {
    this.apiService.updatePlayer(this.playerGuid,this.playerName, this.playerInitials).subscribe(
      response => {
        console.log('Data received:', response);
      });
    this.Response = "Player edited successfully:";
    this.GetEntries();
  }
  onDeleteSubmit() {
    console.log("PlayerGuid", this.playerGuid);
    this.apiService.deletePlayer(this.playerGuid).subscribe(
      response => {
        console.log('Data received:', response);
      });
    this.Response = "Player deleted successfully:";
    const indexToRemove = this.players.findIndex(player => player.uniquePlayerGuid === this.playerGuid);

    // Check if the player was found in the array
    if (indexToRemove !== -1) {
      // Remove the player from the array
      this.players.splice(indexToRemove, 1);
    }
    
  }
}
