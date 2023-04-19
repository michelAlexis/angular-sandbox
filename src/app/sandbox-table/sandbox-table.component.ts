import { Product } from '@/types/product';
import { EuroPipe } from '@/shared/pipes/euro.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable, delay, map, of, shareReplay } from 'rxjs';
import { OrPipe } from 'src/shared/directives/or.directive';
import { AmiTableComponentModule } from './custom-table.component';
import { SandboxTablePrimeNgComponent } from './primeng/primeng-table.component';
import { CdkTableRowTemplateDirective } from './utils/cdk.utils';
import { MatTableRowTemplateDirective } from './utils/material.utls';

@Component({
  selector: 'app-sandbox-table',
  templateUrl: './sandbox-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    AmiTableComponentModule,
    SandboxTablePrimeNgComponent,
    MatTableModule,
    MatTableRowTemplateDirective,
    CdkTableModule,
    CdkTableRowTemplateDirective,
    OrPipe,
    EuroPipe,
  ],
})
export default class SandboxTableComponent {
  values$: Observable<Product[]> = of(this.generateFakeData(10)).pipe(delay(0), shareReplay(1));

  loading$ = this.values$.pipe(map((list) => !list || list.length == 0));

  displayedColumns = ['code', 'name', 'category', 'price'];


  generateFakeData(count: number): Product[] {
    const list = new Array<Product>(count);

    for (let i = 0; i < count; i++) {
      const createAt = new Date();
      createAt.setDate(i % 30);
      list[i] = {
        id: `id-${i + 1}`,
        code: `asdhfkj${i}`,
        name: `Product ${i + 1}`,
        description: `Super longue description`,
        imageUrl: ``,
        price: Math.random() * 100,
        category: `Categorie`,
        createAt: createAt.toISOString(),
      };
    }

    return list;
  }
}
