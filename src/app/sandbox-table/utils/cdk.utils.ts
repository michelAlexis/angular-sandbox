import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TableRowTemplateContext } from './table.utils';

@Directive({
  selector: '[cdkCellDef]',
  standalone: true,
  providers: [
    {
      provide: CdkCellDef,
      useExisting: CdkTableRowTemplateDirective,
    },
  ],
})
export class CdkTableRowTemplateDirective<
  TItem extends object
> extends CdkCellDef {
  @Input('cdkCellDef') data!:
    | TItem[]
    | Observable<TItem[]>
    | Promise<TItem[]>
    | null;

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: CdkTableRowTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}
