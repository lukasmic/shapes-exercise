import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Circle, Rectangle, Shape, Square } from './models/shape.model';
import { ShapesService } from './services/shapes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    attribute1: [0],
    attribute2: [0],
  });
  disabled: boolean = true;
  currentShapeId: number = 0;
  shapes: Shape[] = [{} as Shape];
  shapeAttribute1: number = 0;
  shapeAttribute2: number = 0;

  constructor(private shapesService: ShapesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shapesService.getShapes().subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
      this.currentShapeId = 0;
      this.displayShape(this.shapes[this.currentShapeId]);
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

    this.formGroup.setValue({
      attribute1: this.shapeAttribute1,
      attribute2: this.shapeAttribute2,
    });
  }

  submit(): void {
    var currentShape = this.shapes[this.currentShapeId];

    switch (currentShape._type) {
      case 'Circle':
        this.shapes[this.currentShapeId] = new Circle(
          this.formGroup.value.attribute1
        );
        break;
      case 'Square':
        this.shapes[this.currentShapeId] = new Square(
          this.formGroup.value.attribute1
        );
        break;
      case 'Rectangle':
        this.shapes[this.currentShapeId] = new Rectangle(
          this.formGroup.value.attribute1,
          this.formGroup.value.attribute2
        );
        break;
      default:
        break;
    }

    this.shapeAttribute1 = this.formGroup.value.attribute1;
    this.shapeAttribute2 = this.formGroup.value.attribute2;
  }

  save(): void {
    this.shapesService.saveShapes(this.shapes).subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
    });
  }

  selectPreviousShape(): void {
    this.currentShapeId =
      this.currentShapeId == 0
        ? this.shapes.length - 1
        : this.currentShapeId - 1;
    this.displayShape(this.shapes[this.currentShapeId]);
  }

  selectNextShape(): void {
    this.currentShapeId =
      this.currentShapeId == this.shapes.length - 1
        ? 0
        : this.currentShapeId + 1;
    this.displayShape(this.shapes[this.currentShapeId]);
  }
}
