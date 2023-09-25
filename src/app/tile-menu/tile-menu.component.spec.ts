import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMenuComponent } from './tile-menu.component';

describe('TileMenuComponent', () => {
  let component: TileMenuComponent;
  let fixture: ComponentFixture<TileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TileMenuComponent]
    });
    fixture = TestBed.createComponent(TileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
