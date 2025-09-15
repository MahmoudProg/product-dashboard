import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // shared components, directives, pipes
  ],
  imports: [CommonModule],
  exports: [
    CommonModule, // دايمًا نصدر CommonModule
    // وباقي المكونات المشتركة
  ],
})
export class SharedModule {}
