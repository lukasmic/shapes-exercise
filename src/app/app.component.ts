import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Shape } from './shape.model';
import { ShapesService } from './shapes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  shapeAttribute1Control = new FormControl(0);
  shapeAttribute2Control = new FormControl(0);
  formGroup = new FormGroup({
    shapeAttribute1Control: this.shapeAttribute1Control,
    shapeAttribute2Control: this.shapeAttribute2Control,
  });
  shapes!: Shape[];
  currentShape: Shape = {} as Shape;
  shapeAttribute1: number = 0;
  shapeAttribute2: number = 0;

  constructor(private shapesService: ShapesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shapesService.getShapes().subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
      this.currentShape = this.shapes[3];
      this.displayShape(this.currentShape);
    });
  }

  displayShape(shape: Shape): void {
    switch (shape._type) {
      case 'Circle':
        this.shapeAttribute1 = (shape as any).radius;
        this.shapeAttribute2 = 0;
        break;
      case 'Square':
        this.shapeAttribute1 = (shape as any).size;
        this.shapeAttribute2 = 0;
        break;
      case 'Rectangle':
        this.shapeAttribute1 = (shape as any).length;
        this.shapeAttribute2 = (shape as any).width;
        break;
      default:
        break;
    }

    this.shapeAttribute1Control.setValue(this.shapeAttribute1);
    this.shapeAttribute2Control.setValue(this.shapeAttribute2);
  }

  onSubmit(): void {
    this.shapeAttribute1 = this.shapeAttribute1Control.value!;
    this.shapeAttribute2 = this.shapeAttribute2Control.value!;
  }
}
