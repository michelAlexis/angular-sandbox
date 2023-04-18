import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { Observable, delay, map, of, shareReplay, startWith } from 'rxjs';
import { OrPipe } from 'src/shared/directives/or.directive';
import { CdkTableRowTemplateDirective } from './utils/cdk.utils';
import { MatTableRowTemplateDirective } from './utils/material.utls';
import { NgTableRowTemplateDirective } from './utils/primeng.utils';
import { AmiTableComponentModule } from './custom-table.component';
import { CommonModule } from '@angular/common';
import { Product } from '@/model/product.model';

@Component({
  selector: 'app-sandbox-table',
  templateUrl: './sandbox-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    AmiTableComponentModule,
    NgTableRowTemplateDirective,
    MatTableModule,
    MatTableRowTemplateDirective,
    OrPipe,
    CdkTableModule,
    CdkTableRowTemplateDirective,
  ],
})
export default class SandboxTableComponent {
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
    map((list) => !list || list.length == 0),
    startWith(true)
  );

  displayedColumns = ['code', 'name', 'category', 'price'];
}
