import { FormControl, FormGroup } from '@angular/forms';
import { z } from 'zod';
import { buildForm } from './form.utils';

describe('Building form group from zod', () => {
  it('Number should return a FormControl', () => {
    const form = buildForm(z.number());
    expect(form).toBeInstanceOf(FormControl);
  });
  it('String should return a FormControl', () => {
    const form = buildForm(z.string());
    expect(form).toBeInstanceOf(FormControl);
  });
  it('Date should return a FormControl', () => {
    const form = buildForm(z.date());
    expect(form).toBeInstanceOf(FormControl);
  });
  it('Object should return a FormGroup', () => {
    const form = buildForm(z.object({}));
    expect(form).toBeInstanceOf(FormGroup);
  });

  it('Should contain property control', () => {
    const form = buildForm(z.object({
      name: z.string()
    }));

    expect(form.controls.name).toBeInstanceOf(FormControl);
  })
});
