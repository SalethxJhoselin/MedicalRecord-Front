import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
//esta es solo unasimple clase que se esta exportando
export class AppComponent {
  public title: string = 'Atenciones medicas ';//no se esta usando pero en 
  //comparacion a la otra forma, es para mejorar la legibilidad del codigo
  public counter: number = 10;

  increaseBy(value: number): void {
    this.counter += value;
  }
  reset(): void {
    this.counter = 10;
  }
}
