import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WelcomeCardComponent } from '../../welcome-card/welcome-card.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    WelcomeCardComponent
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  profileForm = new FormGroup({
    bgColor: new FormControl('#ffffff'),
    textColor: new FormControl('#000000'),
    underlineCheck: new FormControl(true),
    underlineColor: new FormControl('#000000'),
    borderCheck: new FormControl(true),
    borderColor: new FormControl('#000000'),
    textTitle: new FormControl(''),
    textSize: new FormControl(110)
  })


  // styles: { color: string | undefined | null } = { color: '#ff0000' }

  // ngOnInit(): void {
  //   this.profileForm.valueChanges.subscribe(val => {
  //     this.styles.color = val.color;
  //   })
  // }

  onSubmit() {
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
