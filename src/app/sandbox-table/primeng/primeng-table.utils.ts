import { Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { type Observable } from 'rxjs';
import { TableRowTemplateContext } from '../utils/table.utils';

@Directive({
  selector: 'ng-template[pTableRow]',
  standalone: true,
  providers: [
    {
      provide: PrimeTemplate,
      useExisting: PTableRowTemplateDirective,
    },
  ],
})
export class PTableRowTemplateDirective<
  TItem extends object
> extends PrimeTemplate {
  @Input('pTableRow') data?:
    | TItem[]
    | Observable<TItem[]>
    | Promise<TItem[]>
    | null
    | '';

  constructor(template: TemplateRef<any>) {
    super(template);
    this.name = 'body';
  }

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: PTableRowTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}


type PaginatorState = { page: number, pageCount: number, rows: number, first: number, totalRecords: number };

@Directive({
  selector: 'ng-template[pTablePaginator]',
  standalone: true,
  providers: [
    {
      provide: PrimeTemplate,
      useExisting: PTablePaginatorTemplateDirective,
    },
  ],
})
export class PTablePaginatorTemplateDirective extends PrimeTemplate implements OnInit {
  @Input('pTablePaginator') position!: 'left' | 'right';

  constructor(template: TemplateRef<any>) {
    super(template);
  }

  ngOnInit(): void {
      this.name = this.position === 'left' ? 'paginatorleft' : 'paginatorright';
  }

  static ngTemplateContextGuard(
    dir: PTablePaginatorTemplateDirective,
    ctx: unknown
  ): ctx is TableRowTemplateContext<PaginatorState> {
    return true;
  }
}