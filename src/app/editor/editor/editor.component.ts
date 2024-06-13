import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WelcomeCardComponent } from '../../welcome-card/welcome-card.component';
import { CardsInfoService } from '../../data-access/cards-info.service';
import { AsyncPipe } from '@angular/common';
import { CardsData } from '../../interfaces/cards-data.interface';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    WelcomeCardComponent,
    AsyncPipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  private _cardsInfoService = inject(CardsInfoService);

  // cardsInfo$ = this._cardsInfoService.getCardsInfo();

  profileForm = new FormGroup({
    bgColor: new FormControl('#ffffff'),
    textColor: new FormControl('#000000'),
    underlineCheck: new FormControl(true),
    underlineColor: new FormControl('#000000'),
    borderCheck: new FormControl(true),
    borderColor: new FormControl('#000000'),
    textTitle: new FormControl(''),
    textSize: new FormControl(110),
    bgButtonColor: new FormControl('#000000'),
    iconColor: new FormControl('#ffffff')
  })


  // styles: { color: string | undefined | null } = { color: '#ff0000' }

  // ngOnInit(): void {
  //   this.profileForm.valueChanges.subscribe(val => {
  //     this.styles.color = val.color;
  //   })
  // }

  async onSubmit() {
    if(this.profileForm.invalid) return;

    const cardData = this.profileForm.value as CardsData;

    try {
      const doc = await this._cardsInfoService.addCardInfo(cardData)
      console.log(doc);
    } catch (error) {
      
    }
    console.log(this.profileForm.value);
  }

  isUnderlineChecked() {
    const underlineColorControl = this.profileForm.get('underlineColor');
    console.log(this.profileForm.value.underlineCheck);
    !this.profileForm.value.underlineCheck ? underlineColorControl?.enable() : underlineColorControl?.disable();
  }

  isBorderChecked() {
    const borderColorControl = this.profileForm.get('borderColor');
    console.log(this.profileForm.value.borderCheck);
    !this.profileForm.value.borderCheck ? borderColorControl?.enable() : borderColorControl?.disable();
  }
}
