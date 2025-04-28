import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoralMapComponent } from './electoral-map.component';

describe('ElectoralMapComponent', () => {
  let component: ElectoralMapComponent;
  let fixture: ComponentFixture<ElectoralMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectoralMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectoralMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
