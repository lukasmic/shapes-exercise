import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShapeDisplayComponent } from './shape-display/shape-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CircleComponent } from './shape-display/circle/circle.component';

@NgModule({
  declarations: [ShapeDisplayComponent],
  imports: [CommonModule, ReactiveFormsModule],
  bootstrap: [ShapeDisplayComponent],
  exports: [ShapeDisplayComponent],
})
export class ShapeDisplayModule {}
