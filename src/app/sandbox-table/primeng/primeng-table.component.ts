import { Product } from '@/types/product';
import { OrPipe } from '@/shared/directives/or.directive';
import { EuroPipe } from '@/shared/pipes/euro.pipe';
import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  PTablePaginatorTemplateDirective,
  PTableRowTemplateDirective,
} from './primeng-table.utils';

@Component({
  selector: 'app-sandbox-table-primeng',
  template: `
    <div class="m-3 p-3 rounded-xl bg-slate-300">
      <h2 class="text-3xl font-semibold">UTILS</h2>
      <p-table
        [value]="values"
        [loading]="loading"
        [paginator]="true"
        [rows]="5"
      >
        <ng-template pTemplate="header">
          <tr>
            <th class="bg-red-100">Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </ng-template>
        <!-- <ng-template [pTableRow]="values$" let-product>
      <tr>
        <td>{{ product.code }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </ng-template> -->

        <tr *pTableRow="values; let product">
          <td>{{ product.code }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price | euro }}</td>
        </tr>

        <span *pTablePaginator="'left'; let state">
          Total elements: {{ state.totalRecords }}
        </span>
      </p-table>
    </div>

    <div class="m-3 p-3 rounded-xl bg-slate-300">
      <h2 class="text-3xl font-semibold">REF primeNg</h2>
      <p-table [value]="values" [loading]="loading">
        <ng-template pTemplate="header">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  standalone: true,
  imports: [
    TableModule,
    PTableRowTemplateDirective,
    PTablePaginatorTemplateDirective,
    OrPipe,
    EuroPipe,
  ],
})
export class SandboxTablePrimeNgComponent implements OnInit {
  @Input() values!: Product[];
  @Input() loading: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
