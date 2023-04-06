import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shape } from './shape.model';
import { ShapesService } from './shapes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  shapes!: Shape[];

  constructor(private shapesService: ShapesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shapesService.getShapes()
      .subscribe((shapes: Shape[]) => {
        this.shapes = shapes;
      });
  }
}
