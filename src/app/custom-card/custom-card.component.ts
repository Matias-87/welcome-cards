import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeCardComponent } from '../welcome-card/welcome-card.component';
import { CardsInfoService } from '../data-access/cards-info.service';
import { CardsData } from '../interfaces/cards-data.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    WelcomeCardComponent,
    NgStyle
  ],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss'
})
export class CustomCardComponent implements OnInit {
  private _cardsInfoService = inject(CardsInfoService);

  urlId = this.router.url.match(/\w+$/)?.[0];
  styles: CardsData | undefined;

  ngOnInit(): void {
    console.log(this.urlId);
    if (typeof this.urlId === 'string') {
      this.setCardStyles(this.urlId);
    }
  }

  constructor(private router: Router) { }

  async setCardStyles(id: string) {
    try {
      this.styles = await this._cardsInfoService.getCardInfo(id);

      if (this.styles === undefined) return;
    } catch (error) {
      console.error(error, 'Data not found');
    }
  }
}
