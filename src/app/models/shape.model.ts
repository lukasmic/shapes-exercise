enum ShapeType {
  Circle = 'Circle',
  Square = 'Square',
  Rectangle = 'Rectangle',
}

export interface Shape {
  _type: ShapeType;
}

export class Circle implements Shape {
  _type: ShapeType = ShapeType.Circle;
  constructor(public radius: number) {}
}

export class Square implements Shape {
  _type: ShapeType = ShapeType.Square;
  constructor(public size: number) {}
}

export class Rectangle implements Shape {
  _type: ShapeType = ShapeType.Rectangle;
  constructor(public length: number, public width: number) {}
}
