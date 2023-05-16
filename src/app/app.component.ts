import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Shape } from './shape.model';
import { ShapesService } from './services/shapes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // formGroup = this.fb.group({
  //   shapeAttributeControl: [''],
  //   shapeAttribute2Control: [''],
  //   address: this.fb.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   }),
  // });

  currentShapeId: number = 0;
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
      this.currentShape = this.shapes[0];
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
    switch (this.currentShape._type) {
      case 'Circle':
        (this.currentShape as any).radius = this.shapeAttribute1;
        this.shapes[this.currentShapeId] = this.currentShape as Shape;
        break;
      case 'Square':
        (this.currentShape as any).size = this.shapeAttribute1;
        break;
      case 'Rectangle':
        (this.currentShape as any).length = this.shapeAttribute1;
        (this.currentShape as any).width = this.shapeAttribute2;
        break;
      default:
        break;
    }
    this.shapes[this.currentShapeId] = this.currentShape as Shape;
    this.shapeAttribute1 = this.shapeAttribute1Control.value!;
    this.shapeAttribute2 = this.shapeAttribute2Control.value!;
  }

  selectPreviousShape(): void {
    const index = this.shapes.indexOf(this.currentShape);
    if (index > 0) {
      this.currentShape = this.shapes[index - 1];
      this.currentShapeId = index - 1;
      this.displayShape(this.currentShape);
    }
  }

  selectNextShape(): void {
    const index = this.shapes.indexOf(this.currentShape);
    if (index < this.shapes.length - 1) {
      this.currentShape = this.shapes[index + 1];
      this.currentShapeId = index + 1;
      this.displayShape(this.shapes[this.currentShapeId]);
    }
  }
}
