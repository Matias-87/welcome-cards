import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WelcomeCardComponent } from '../../welcome-card/welcome-card.component';
import { CardsInfoService } from '../../data-access/cards-info.service';
import { AsyncPipe, NgStyle } from '@angular/common';
import { CardsData } from '../../interfaces/cards-data.interface';
import { arrayBuffer } from 'stream/consumers';
import { atLeastOneRequired } from '../../../validators/custom-validators';

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
  private idCounter = 1;

  // cardsInfo$ = this._cardsInfoService.getCardsInfo();

  profileForm = this.formBuilder.group({
    bgColor: ['#FFD275', Validators.required],
    textColor: ['#541D1D', Validators.required],
    frontImg: [null as ArrayBuffer | null | string],
    underlineCheck: [true, Validators.required],
    underlineColor: ['#AA7849'],
    borderCheck: [true, Validators.required],
    borderColor: ['#AA7849'],
    textTitle: ['Texto de Ejemplo.'],
    titleAlign: ['center', Validators.required],
    bgButtonColor: ['#AA7849', Validators.required],
    iconColor: ['#541D1D', Validators.required],
    roundedCheck: [true, Validators.required],
    backContent: this.formBuilder.array([this.formBuilder.group({
      textTitleBack: [''],
      textContentBack: [''],
      underlineBackTitle: [true, Validators.required],
      backImg: [null as ArrayBuffer | null | string],
      id: 0
    }, { validators: atLeastOneRequired(['textTitleBack', 'backImg'])})]),
    backgroundContent: this.formBuilder.group({
      color1: ['#E3655B', Validators.required],
      color2: ['#FA6B37', Validators.required],
      bgGradient: [true, Validators.required]
    })
  }, { validators: atLeastOneRequired(['textTitle', 'frontImg']) });

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
    // try {
    //   const doc = await this._cardsInfoService.addCardInfo(cardData)
    //   console.log(doc.id);
    //   this.openNewTab(doc.id);
    // } catch (error) {

    // }
    console.log(this.profileForm.value);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      const file: File = input.files[0];

      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        this.profileForm.patchValue({ frontImg: readerEvent.target?.result })
      }

      // this.profileForm.patchValue({backContent: [{id: 'hola'}]})
    }
  }

  onFileSelectedBack(event: Event, idx: number): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      const file: File = input.files[0];
      const backContent = this.profileForm.get('backContent') as FormArray;

      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        backContent.at(idx).patchValue({ backImg: readerEvent.target?.result })
      }
    }
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
      textTitleBack: [''],
      textContentBack: [''],
      underlineBackTitle: [true, Validators.required],
      backImg: [null],
      id: this.idCounter++
    }, {validators: atLeastOneRequired(['textTitleBack', 'backImg'])}))
  }

  deleteBackComponent(idx: number) {
    const backContent = this.profileForm.get('backContent') as FormArray;

    backContent.removeAt(idx);
  }

  deleteFrontImg(fileInput: HTMLInputElement) {
    fileInput.value = ''
    this.profileForm.patchValue({ frontImg: null });
  }

  deleteBackImg(idx: number, fileInput: HTMLInputElement) {
    const backContent = this.profileForm.get('backContent') as FormArray;

    fileInput.value = '';
    backContent.at(idx).patchValue({ backImg: null });
  }
}
