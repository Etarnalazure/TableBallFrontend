import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:44346/api/controller/';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any[]> {
    const endpoint = `${this.apiUrl}players/GetPlayers`;
    return this.http.get<any[]>(endpoint);
  }
  getPlayerById(playerGuid:string): Observable<any> {
    const endpoint = `${this.apiUrl}players/`+playerGuid;
    return this.http.get<any>(endpoint);
  }
  createPlayer(playerName:string, playerInitials:string): Observable<any[]> {
    const endpoint = `${this.apiUrl}players/CreatePlayer`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    console.log("Player Creation", endpoint, playerName);
    return this.http.post<any[]>(
      endpoint,
      {
        "playerName": playerName,
        "playerInitials": playerInitials
      },{headers});
  }

  updatePlayer(playerGuid:string, playerName:string, playerInitials:string): Observable<any[]> {
    const endpoint = `${this.apiUrl}players/edit/`+playerGuid;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
   
    return this.http.post<any[]>(
      endpoint,
      {
        "playerName": playerName,
        "playerInitials": playerInitials
      },{headers});
  }
  
  getHighScore(): Observable<any[]> {
    const endpoint = `${this.apiUrl}players/OrderBy/false`;
    return this.http.get<any[]>(endpoint);
  }

  getTeams(): Observable<any[]> {
    const endpoint = `${this.apiUrl}team/GetTeams`;
    return this.http.get<any[]>(endpoint);
  }

  createTeam(teamName:string, playerOne:string, playerTwo:string): Observable<any[]> {
    const endpoint = `${this.apiUrl}team/CreateTeam`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    return this.http.post<any[]>(
      endpoint,
      {
        "playerOne": playerOne,
        "playerTwo": playerTwo,
        "teamName": teamName
      },{headers});
  }

  deleteTeam(teamGuid:string): Observable<any[]> {
    const endpoint = `${this.apiUrl}team/Delete/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    console.log("Delete", endpoint+teamGuid)
    return this.http.delete<any[]>(endpoint+teamGuid,{headers});
  }

  
  deletePlayer(playerGuid:string): Observable<any[]> {
    const endpoint = `${this.apiUrl}players/Delete/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    return this.http.delete<any[]>(endpoint+playerGuid,{headers});
  }
  
}
