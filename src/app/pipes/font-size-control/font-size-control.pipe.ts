import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fontSizeControl',
  standalone: true
})
export class FontSizeControlPipe implements PipeTransform {
  baseFontSize = 85;
  minFontSize = 40;
  maxFontSize = 85;
  wordsPerFontSizeReduction = 3;
  fontSizeReduction = 10;

  transform(textTitle: string | undefined): string {
    if (textTitle === undefined || textTitle === '') return `${this.maxFontSize}px`;

    const textLength = textTitle.split(' ').filter(val => val !== '').length;

    const reduction = this.wordsPerFontSizeReduction + Math.floor(textLength / 10);

    this.baseFontSize = this.maxFontSize - Math.floor(textLength / reduction) * this.fontSizeReduction;

    this.baseFontSize = Math.max(this.baseFontSize, this.minFontSize);

    return `${this.baseFontSize}px`
  }
  // fontSize = 150;
  // lastLength = 0;
  // divider = 3;
  // less = 25;

  // transform(textTitle: string | undefined): string {
  //   if (textTitle === undefined) return `${this.fontSize}px`;
  //   if (textTitle === '') {
  //     this.fontSize = 150;
  //     this.lastLength = 0;
  //     this.divider = 3;
  //     this.less = 25;
  //   };
  //   const baseSize = 3;
  //   const textLength = textTitle.split(' ').filter(val => val !== '').length;

  //   if (textLength % this.divider === 0 && textLength !== this.lastLength && this.fontSize >= 50) {
  //     this.fontSize -= 30;
  //     this.lastLength = textLength;
  //     this.divider *= 2;
  //   }
  //   // if (textLength % (this.divider / 2) === 0 && textLength < this.lastLength) {
  //   //   this.lastLength = textLength;
  //   //   this.fontSize += 30;
  //   //   this.divider /= 2;
  //   // }

  //   console.log(textLength);

  //   return `${this.fontSize}px`;
  // }
}
