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
  public title: string = 'Atenciones medicas ';
}
