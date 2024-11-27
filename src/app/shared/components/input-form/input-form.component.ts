import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  @Input() navPage!: string;

  constructor(private router: Router){}

  onSubmit(formData: NgForm){
    this.formValues.emit(formData.value)
    this.router.navigate(['/','update'])
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onClick(){
    this.clicked.emit()
    this.isFormVisible = false;
  }

  
}
