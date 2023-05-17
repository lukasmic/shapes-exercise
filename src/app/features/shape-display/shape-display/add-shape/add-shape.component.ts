import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Circle,
  Rectangle,
  Shape,
  ShapeType,
  Square,
} from 'src/app/models/shape.model';

@Component({
  selector: 'app-add-shape',
  templateUrl: './add-shape.component.html',
  styleUrls: ['./add-shape.component.css'],
})
export class AddShapeComponent implements OnInit {
  @Output() newShapeEvent = new EventEmitter();

  shapeTypes = Object.values(ShapeType);
  selectedShapeType: ShapeType = ShapeType.Circle;
  nameOfAttribute1: string = 'Radius';
  nameOfAttribute2: string = '';
  formGroup: FormGroup = this.fb.group({
    attribute1: [1],
    attribute2: [1],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onShapeSelect(): void {
    switch (this.selectedShapeType) {
      case ShapeType.Circle:
        this.nameOfAttribute1 = 'Radius';
        this.nameOfAttribute2 = '';
        break;
      case ShapeType.Square:
        this.nameOfAttribute1 = 'Size';
        this.nameOfAttribute2 = '';
        break;
      case ShapeType.Rectangle:
        this.nameOfAttribute1 = 'Width';
        this.nameOfAttribute2 = 'Height';
        break;
      default:
        this.nameOfAttribute1 = 'Attribute 1';
        this.nameOfAttribute2 = 'Attribute 2';
        break;
    }
  }

  addShape(): void {
    switch (this.selectedShapeType) {
      case ShapeType.Circle:
        this.newShapeEvent.emit(new Circle(this.formGroup.value.attribute1));
        break;
      case ShapeType.Square:
        this.newShapeEvent.emit(new Square(this.formGroup.value.attribute1));
        break;
      case ShapeType.Rectangle:
        this.newShapeEvent.emit(
          new Rectangle(
            this.formGroup.value.attribute1,
            this.formGroup.value.attribute2
          )
        );
        break;
    }
  }
}
