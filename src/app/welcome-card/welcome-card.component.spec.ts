import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeCardComponent } from './welcome-card.component';
import { Component } from '@angular/core';

describe('WelcomeCardComponent', () => {
  let component: WelcomeCardComponent;
  let fixture: ComponentFixture<WelcomeCardComponent>;

  @Component({ standalone: true, selector: 'app-my-info', template: ''})
  class MyInfoStubComponent { }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeCardComponent],
      imports: [MyInfoStubComponent]
    });
    fixture = TestBed.createComponent(WelcomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called the function rotateClass when the button is clicked', () => {
    const rotateButton = fixture.nativeElement.querySelectorAll('.rotateButton');
    const addRotateClassSpy = spyOn(component, 'addRotateClass');

    rotateButton[0].click();
    expect(addRotateClassSpy).toHaveBeenCalled();

    rotateButton[1].click();
    expect(addRotateClassSpy).toHaveBeenCalled()
  })

  it('should change the value of rotateClass when the button is clicked', () => {
    const rotateButton = fixture.nativeElement.querySelectorAll('.rotateButton');

    expect(component.rotateClass).toBeFalse();
    expect(rotateButton.length).toBe(2);

    rotateButton[0].click();

    expect(component.rotateClass).toBeTrue();

    rotateButton[1].click();
    expect(component.rotateClass).toBeFalse();
  })
});
