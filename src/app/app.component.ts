import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="font-bold text-3xl text-center py-6 bg-slate-100">
      AMI Angular Sandbox
    </h1>
    <div class="p-4">
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Ami test table';
}
