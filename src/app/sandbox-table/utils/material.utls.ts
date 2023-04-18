import { Directive, Input } from '@angular/core';
import { MatCellDef } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TableRowTemplateContext } from './table.utils';

@Directive({
  selector: '[matCellDef]',
  standalone: true,
  providers: [
    {
      provide: MatCellDef,
      useExisting: MatTableRowTemplateDirective,
    },
  ],
})
export class MatTableRowTemplateDirective<
  TItem extends object
> extends MatCellDef {
  @Input('matCellDef') data!:
    | TItem[]
    | Observable<TItem[]>
    | Promise<TItem[]>
    | null;

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: MatTableRowTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}