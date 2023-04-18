import { Directive, Input, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { type Observable } from 'rxjs';
import { TableRowTemplateContext } from './table.utils';

@Directive({
  selector: 'ng-template[pTableRow]',
  standalone: true,
  providers: [
    {
      provide: PrimeTemplate,
      useExisting: NgTableRowTemplateDirective,
    },
  ],
})
export class NgTableRowTemplateDirective<
  TItem extends object
> extends PrimeTemplate {
  @Input('pTableRow') data!:
    | TItem[]
    | Observable<TItem[]>
    | Promise<TItem[]>
    | null;

  constructor(template: TemplateRef<any>) {
    super(template);
    this.name = 'body';
  }

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: NgTableRowTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}