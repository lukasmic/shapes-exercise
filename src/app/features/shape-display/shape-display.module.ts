import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShapeDisplayComponent } from './shape-display/shape-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddShapeComponent } from './shape-display/add-shape/add-shape.component';

@NgModule({
  declarations: [ShapeDisplayComponent, AddShapeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  bootstrap: [ShapeDisplayComponent],
  exports: [ShapeDisplayComponent],
})
export class ShapeDisplayModule {}
