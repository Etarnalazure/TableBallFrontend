import { Component } from '@angular/core';

@Component({
  selector: 'app-tile-menu',
  templateUrl: './tile-menu.component.html',
  styleUrls: ['./tile-menu.component.scss']
})
export class TileMenuComponent {
 // Track which tile is clicked
 selectedTile: number | null = 0; // Initialize to the first tile by default

 ngOnInit() {}

 // Method to handle tile click
 tileClicked(index: number) {
   this.selectedTile = index;
 }
}
