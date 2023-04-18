import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';

interface TableHeaderTemplateContext<TItem extends object> {
  $implicit: TItem[];
}

@Directive({
  selector: 'ng-template[appTableHeader]',
})
export class TableHeaderTemplateDirective<TItem extends object> {
  @Input('appTableHeader') data!: TItem[] | '';

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: TableHeaderTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableHeaderTemplateContext<TContextItem> {
    return true;
  }
}

interface TableRowTemplateContext<TItem extends object> {
  $implicit: TItem;
}

@Directive({
  selector: 'ng-template[appTableRow]',
})
export class TableRowTemplateDirective<TItem extends object> {
  @Input('appTableRow') data!: TItem[] | null;

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: TableRowTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}


@Component({
  selector: 'ami-table',
  template: `
    <table class="p-datatable p-datatable-table" [style.fontFamily]="'var(--font-family)'">
      <!-- Head -->
      <thead class="p-datatable-thead">
        <tr>
          <ng-container
            *ngTemplateOutlet="
              headers || defaultHeaderTemplate;
              context: { $implicit: data }
            "
          ></ng-container>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="p-datatable-tbody">
        <tr *ngFor="let row of data">
          <ng-container
            *ngTemplateOutlet="
              rows || defaultRowTemplate;
              context: { $implicit: row }
            "
          ></ng-container>
        </tr>
      </tbody>
    </table>

    <!-- If no template is provided use keys as headers and display all values -->
    <ng-template #defaultHeaderTemplate let-data>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>
    <ng-template #defaultRowTemplate let-row>
      <td *ngFor="let row of row | keyvalue">{{ row.value }}</td>
    </ng-template>
  `,
})
export class TableComponent<TItem extends object> {
  @Input() data!: TItem[] | null;
  @ContentChild(TableHeaderTemplateDirective, { read: TemplateRef })
  headers?: TemplateRef<any>;
  @ContentChild(TableRowTemplateDirective, { read: TemplateRef })
  rows?: TemplateRef<any>;
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
  ],
  exports: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
  ],
})
export class AmiTableComponentModule {}
