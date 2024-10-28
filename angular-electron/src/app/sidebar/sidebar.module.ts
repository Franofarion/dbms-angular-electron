import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '../shared/shared.module';

import { SidebarModule as SidebarNgModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    SidebarNgModule,
    ButtonModule,
    TreeModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
