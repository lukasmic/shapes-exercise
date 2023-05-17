import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Circle, Rectangle, Shape, Square } from 'src/app/models/shape.model';
import { ShapesService } from 'src/app/services/shapes.service';

@Component({
  selector: 'app-shape-display',
  templateUrl: './shape-display.component.html',
  styleUrls: ['./shape-display.component.css'],
})
export class ShapeDisplayComponent implements OnInit {
  areaSize: number = 0;
  disabled: boolean = true;
  currentShapeId: number = 0;
  shapes: Shape[] = [{} as Shape];
  nameOfAttribute1!: string;
  shapeAttribute1: number = 0;
  nameOfAttribute2!: string;
  shapeAttribute2: number = 0;
  formGroup: FormGroup = this.fb.group({
    attribute1: [0],
    attribute2: [0],
  });
  addShapeToggle: boolean = false;

  constructor(private shapesService: ShapesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shapesService.getShapes().subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
      if (this.shapes.length > 0) {
        this.displayShape(this.shapes[this.currentShapeId]);
      }
    });
  }

  displayShape(shape: Shape): void {
    if (shape == undefined) {
      this.areaSize = 0;
      this.disabled = true;
      return;
    }
    switch (shape._type) {
      case 'Circle':
        this.nameOfAttribute1 = 'Radius';
        this.shapeAttribute1 = (shape as any).radius;
        this.shapeAttribute2 = 0;
        this.areaSize = Math.PI * this.shapeAttribute1 ** 2;
        break;
      case 'Square':
        this.nameOfAttribute1 = 'Size';
        this.shapeAttribute1 = (shape as any).size;
        this.shapeAttribute2 = 0;
        this.areaSize = this.shapeAttribute1 ** 2;
        break;
      case 'Rectangle':
        this.nameOfAttribute1 = 'Length';
        this.nameOfAttribute2 = 'Width';
        this.shapeAttribute1 = (shape as any).length;
        this.shapeAttribute2 = (shape as any).width;
        this.areaSize = this.shapeAttribute1 * this.shapeAttribute2;
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

    this.displayShape(this.shapes[this.currentShapeId]);
  }

  save(): void {
    this.shapesService.saveShapes(this.shapes).subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
    });
  }

  remove(): void {
    this.shapes.splice(this.currentShapeId, 1);
    this.currentShapeId =
      this.currentShapeId == this.shapes.length
        ? this.shapes.length - 1
        : this.currentShapeId;

    this.displayShape(this.shapes[this.currentShapeId]);
  }

  add(newShape: Event): void {
    this.shapes.push(Object.create(newShape) as Shape);
    this.addShapeToggle = false;
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
