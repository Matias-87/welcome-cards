import { AbstractControl, ValidatorFn } from "@angular/forms";

export function atLeastOneRequired(controlNames: string[]): ValidatorFn {
    return (formGroup: AbstractControl) => {
        const controls = controlNames.map(name => formGroup.get(name));
        const anyFilled = controls.some(control => {
            if (control && control.value) {
                return typeof control.value === 'string' ? control.value.trim().length > 0 : true;
            }
            return false;
        });

        return anyFilled ? null : { atLeastOneRequired: true };
    }
}