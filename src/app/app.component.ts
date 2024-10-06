import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolListComponent } from "./components/pages/tool-list/tool-list.component";
import { TitleComponent } from "./components/partials/title/title.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolListComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'navigator';
}
