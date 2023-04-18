import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'or',
  pure: true,
  standalone: true,
})
export class OrPipe implements PipeTransform {
  transform<T>(value: T | null | undefined, or: T): T {
    return value ?? or;
  }
}
