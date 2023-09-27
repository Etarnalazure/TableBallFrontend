import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBattleComponent } from './create-battle.component';

describe('CreateBattleComponent', () => {
  let component: CreateBattleComponent;
  let fixture: ComponentFixture<CreateBattleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBattleComponent]
    });
    fixture = TestBed.createComponent(CreateBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
