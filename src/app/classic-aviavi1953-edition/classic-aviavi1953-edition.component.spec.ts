import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicAVIAVI1953EditionComponent } from './classic-aviavi1953-edition.component';

describe('ClassicAVIAVI1953EditionComponent', () => {
  let component: ClassicAVIAVI1953EditionComponent;
  let fixture: ComponentFixture<ClassicAVIAVI1953EditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicAVIAVI1953EditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicAVIAVI1953EditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
