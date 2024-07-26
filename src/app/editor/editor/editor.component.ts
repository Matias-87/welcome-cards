import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WelcomeCardComponent } from '../../welcome-card/welcome-card.component';
import { CardsInfoService } from '../../data-access/cards-info.service';
import { AsyncPipe, NgStyle } from '@angular/common';
import { CardsData } from '../../interfaces/cards-data.interface';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    WelcomeCardComponent,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  private _cardsInfoService = inject(CardsInfoService);
  private idCounter = 0;

  // cardsInfo$ = this._cardsInfoService.getCardsInfo();

  profileForm = this.formBuilder.group({
    bgColor: ['#FFD275', Validators.required],
    textColor: ['#541D1D', Validators.required],
    underlineCheck: [true, Validators.required],
    underlineColor: ['#AA7849'],
    borderCheck: [true, Validators.required],
    borderColor: ['#AA7849'],
    textTitle: ['Texto de Ejemplo.', Validators.required],
    titleAlign: ['center', Validators.required],
    bgButtonColor: ['#AA7849', Validators.required],
    iconColor: ['#541D1D', Validators.required],
    roundedCheck: [true, Validators.required],
    backContent: this.formBuilder.array([this.formBuilder.group({
      textTitleBack: ['', Validators.required],
      textContentBack: ['', Validators.required],
      underlineBackTitle: [true, Validators.required],
      id: 0
    })]),
    backgroundContent: this.formBuilder.group({
      color1: ['#E3655B', Validators.required],
      color2: ['#FA6B37', Validators.required],
      bgGradient: [true, Validators.required]
    })
  })

  constructor(private formBuilder: FormBuilder) { }

  // styles: { color: string | undefined | null } = { color: '#ff0000' }

  // ngOnInit(): void {
  //   this.profileForm.valueChanges.subscribe(val => {
  //     this.styles.color = val.color;
  //   })
  // }

  async onSubmit() {
    if (this.profileForm.invalid) return;

    const cardData = this.profileForm.value as CardsData;

    //Descomentar al terminar las pruebas
    try {
      const doc = await this._cardsInfoService.addCardInfo(cardData)
      console.log(doc.id);
      this.openNewTab(doc.id);
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

  isGradientChecked() {
    const color2 = this.profileForm.get('backgroundContent')?.get('color2');
    !this.profileForm.value.backgroundContent?.bgGradient ? color2?.enable() : color2?.disable();
  }

  getCardData(): CardsData {
    return this.profileForm.value as CardsData;
  }

  openNewTab(id: string) {
    const newTab = window.open('/custom-card/' + id, '_blank');
    newTab?.focus();
  }

  createNewComponent() {
    const backContent = this.profileForm.get('backContent') as FormArray;

    backContent.push(this.formBuilder.group({
      textTitleBack: ['', Validators.required],
      textContentBack: ['', Validators.required],
      underlineBackTitle: [true, Validators.required],
      id: this.idCounter++
    }))
  }

  deleteBackComponent(idx: number) {
    const backContent = this.profileForm.get('backContent') as FormArray;

    backContent.removeAt(idx);
  }
}
