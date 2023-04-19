import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // Shared
  ],
  template: `
    <div class="flex justify-between max-w-xl m-auto">
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label>Name</label>
          <input [formControl]="form.controls.name" class="ml-2 bg-stone-100" />
        </div>
        <button type="submit" class="">Submit</button>
      </form>

      <div>
        <pre>{{ result | json }}</pre>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NameComponent {
  public readonly form = this.fb.nonNullable.group({
    name: [''],
  });

  result: typeof this.form.value | null = null;

  constructor(private fb: FormBuilder) {}

  submit() {
    this.result = this.form.value;
  }
}
