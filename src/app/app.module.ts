import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShapesService } from './services/shapes.service';
import { ShapeDisplayModule } from './features/shape-display/shape-display.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ReactiveFormsModule, BrowserModule, ShapeDisplayModule],
  providers: [ShapesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
