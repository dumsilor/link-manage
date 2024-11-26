import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent {
  @Input() fields: string[] = ["demo1", "demo2", "demo3", "demo4"]
  @Output() formValues: EventEmitter<{}> = new EventEmitter<{}>();
  formData: {[key: string]: string} = {}
  @Input() isFormVisible: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>()

  onSubmit(formData: NgForm){
    this.formValues.emit(formData.value)
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onClick(){
    this.clicked.emit()
  }
}
