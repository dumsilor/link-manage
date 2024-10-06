import { Component, Input } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'tool',
  standalone: true,
  imports: [ClipboardModule],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.scss'
})
export class ToolComponent {
  @Input() name!: string;
 @Input() url!: string;
 @Input() userName!: string;
 @Input() password!: string;
}
