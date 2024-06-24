import { NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardsData } from '../interfaces/cards-data.interface';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent {
  @Input() styleConfig: CardsData | undefined;

  rotateClass: boolean = false;

  // ngOnChanges(changes: SimpleChanges): void {
    
  // }

  addRotateClass() {
    this.rotateClass = !this.rotateClass;
  }
}
