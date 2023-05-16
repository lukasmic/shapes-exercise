import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Circle, Rectangle, Shape, Square } from './shape.model';
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
  shapes: Shape[] = [{} as Shape];
  shapeAttribute1: number = 0;
  shapeAttribute2: number = 0;

  constructor(private shapesService: ShapesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shapesService.getShapes().subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
      this.currentShapeId = 1;
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

    this.shapeAttribute1Control.setValue(this.shapeAttribute1);
    this.shapeAttribute2Control.setValue(this.shapeAttribute2);
  }

  submit(): void {
    var currentShape = this.shapes[this.currentShapeId];

    switch (currentShape._type) {
      case 'Circle':
        this.shapes[this.currentShapeId] = new Circle(
          this.shapeAttribute1Control.value!
        );
        break;
      case 'Square':
        this.shapes[this.currentShapeId] = new Square(
          this.shapeAttribute1Control.value!
        );
        break;
      case 'Rectangle':
        this.shapes[this.currentShapeId] = new Rectangle(
          this.shapeAttribute1Control.value!,
          this.shapeAttribute2Control.value!
        );
        break;
      default:
        break;
    }
    this.shapeAttribute1 = this.shapeAttribute1Control.value!;
    this.shapeAttribute2 = this.shapeAttribute2Control.value!;
  }

  save(): void {
    this.shapesService.saveShapes(this.shapes).subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
    });
  }

  selectPreviousShape(): void {
    this.currentShapeId =
      this.currentShapeId === 0
        ? this.shapes.length - 1
        : this.currentShapeId - 1;
    this.displayShape(this.shapes[this.currentShapeId]);
  }

  selectNextShape(): void {
    this.currentShapeId =
      this.currentShapeId === this.shapes.length - 1
        ? 0
        : this.currentShapeId + 1;
    this.displayShape(this.shapes[this.currentShapeId]);
  }
}
