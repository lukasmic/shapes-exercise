export interface Shape {
  _type: string;
}

export class Circle implements Shape {
  _type: string = 'Circle';
  constructor (public radius: number) { }
}

export class Square implements Shape {
  _type: string = 'Square';
  constructor (public size: number) { }
}

export class Rectangle implements Shape {
  _type: string = 'Rectangle';
  constructor (public length: number, public width: number) { }
}
