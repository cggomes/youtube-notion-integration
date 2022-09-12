import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSubmit', () => {
    afterEach(() => {
      routerMock.navigate.calls.reset();
    });

    it('should redirect to result page if #searchTerm is NOT empty', () => {
      component.searchTerm = 'christian-youtube-notion-integration';
      component.handleSubmit();

      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
      expect(routerMock.navigate)
        .toHaveBeenCalledWith(['/results'], {
          queryParams: {
            searchTerm: 'christian-youtube-notion-integration',
          }
        });
    });

    it('should NOT redirect if #searchTerm is EMPTY', () => {
      component.searchTerm = '';
      component.handleSubmit();

      expect(routerMock.navigate).toHaveBeenCalledTimes(0);
    });
  });
});
