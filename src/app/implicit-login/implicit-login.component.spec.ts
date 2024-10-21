import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitLoginComponent } from './implicit-login.component';

describe('ImplicitLoginComponent', () => {
  let component: ImplicitLoginComponent;
  let fixture: ComponentFixture<ImplicitLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImplicitLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImplicitLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
