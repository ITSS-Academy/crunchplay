import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioHeaderComponent } from './studio-header.component';

describe('StudioHeaderComponent', () => {
  let component: StudioHeaderComponent;
  let fixture: ComponentFixture<StudioHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
