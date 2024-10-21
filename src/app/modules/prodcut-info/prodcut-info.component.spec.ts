import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutInfoComponent } from './prodcut-info.component';

describe('ProdcutInfoComponent', () => {
  let component: ProdcutInfoComponent;
  let fixture: ComponentFixture<ProdcutInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdcutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
