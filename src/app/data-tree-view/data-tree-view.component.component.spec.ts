import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTreeViewComponent } from './data-tree-view.component';

describe('TreeNestedOverviewExampleComponent', () => {
  let component: DataTreeViewComponent;
  let fixture: ComponentFixture<DataTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
