import { NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardsData } from '../interfaces/cards-data.interface';
import { FontSizeControlPipe } from '../pipes/font-size-control/font-size-control.pipe';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [
    NgStyle,
    FontSizeControlPipe
  ],
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent {
  @Input() styleConfig: CardsData | undefined;

  rotateClass: boolean = false;
  fontSize: number = 150;
  multiplier: number = 8;

  // ngOnChanges(changes: SimpleChanges): void {
    
  // }

  addRotateClass() {
    this.rotateClass = !this.rotateClass;
  }

  fontsizeControl(textTitle: string | undefined): string {
    if (textTitle === undefined) return `${this.fontSize}px`;

    const baseSize = 3;
    const textLength = textTitle.split(' ').filter(val => val !== '').length;
    // let res = this.fontSize;

    if (textLength > baseSize) {
      this.fontSize -= 1;
      console.log(this.fontSize);
    }

    return `${this.fontSize}px`;
  }
}
