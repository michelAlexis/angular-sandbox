import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro',
  standalone: true,
})
export class EuroPipe implements PipeTransform {
  transform(value: number): string {
    return formatCurrency(value, 'fr', '€', 'eur');
  }
}
