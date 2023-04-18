import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { MatCellDef } from '@angular/material/table';
import { PrimeTemplate } from 'primeng/api';
import { Observable, delay, map, of, shareReplay, startWith } from 'rxjs';
import { Product } from './product.model';
import { CdkCellDef } from '@angular/cdk/table';

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

interface TableRowTemplateContext<TItem extends object> {
  $implicit: TItem;
}

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Ami test table';

  values$: Observable<Product[]> = of([
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      imageUrl: 'bamboo-watch.jpg',
      price: 65,
      category: 'Food',
      createAt: new Date().toISOString(),
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'AMI banana',
      description: 'Product Description',
      imageUrl: 'bamboo-watch.jpg',
      price: 42,
      category: 'Fruit',
      createAt: new Date().toISOString(),
    },
  ]).pipe(delay(2000), shareReplay(1));

  loading$ = this.values$.pipe(
    map((list) => list.length == 0),
    startWith(true)
  );

  displayedColumns = ['code', 'name', 'category', 'price'];
}
