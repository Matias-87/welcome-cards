import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  profileForm = this.formBuilder.group({
    bgColor: ['#ffffff', Validators.required],
    textColor: ['#000000', Validators.required],
    underlineCheck: [true, Validators.required],
    underlineColor: ['#000000'],
    borderCheck: [true, Validators.required],
    borderColor: ['#000000'],
    textTitle: ['', Validators.required],
    textSize: [110, Validators.required],
    titleAlign: ['center', Validators.required],
    bgButtonColor: ['#000000', Validators.required],
    iconColor: ['#ffffff', Validators.required],
    roundedCheck: [true, Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {}

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
      console.log(doc.id);
      this.openNewTab(doc.id);
    } catch (error) {
      
    }
    // console.log(this.profileForm.value);
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

  getCardData(): CardsData {
    return this.profileForm.value as CardsData;
  }

  openNewTab(id: string) {
    const newTab = window.open('/custom-card/' + id, '_blank');
    newTab?.focus();
  }
}
