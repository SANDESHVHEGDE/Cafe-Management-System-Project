import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenulistComponent } from './admin-menulist.component';

describe('AdminMenulistComponent', () => {
  let component: AdminMenulistComponent;
  let fixture: ComponentFixture<AdminMenulistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenulistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
