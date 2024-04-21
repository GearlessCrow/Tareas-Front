import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Toastify from 'toastify-js';
import { style } from '@angular/animations';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styleUrl: './tareas-form.component.scss'
})
export class TareasFormComponent implements OnInit {
  tareasForm: FormGroup=new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    estado: new FormControl('', [Validators.required])
  });
  tareasId?: number;
  constructor(
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.loadDataIntoForm();
  }
  saveTareas(): void{
    if(this.tareasId){
      this.tareasService.updateTarea(this.tareasId, this.tareasForm.value).subscribe(tarea=>{
        this.showSuccessToast("Tarea Actualizado con Éxito!");
        this.router.navigateByUrl('/tareas');
      });
    }else{
    this.tareasService.createTarea(this.tareasForm.value).subscribe(tareas=>{
      this.showSuccessToast("Tarea Creada con Éxito!");
      this.router.navigateByUrl('/tareas');
    });}
  }
  hasError(field:string): boolean{
    const errorsObject= this.tareasForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if(errors.length && (this.tareasForm.get(field)?.touched || this.tareasForm.get(field)?.dirty)){
      return true;
    }
    return false;

  }
  getCurrentError(field: string):string{
    const errorsObject= this.tareasForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if(!errors){
      return '';
    }
    return errors[0];
  }
  getFormTittle():string{
    return this.tareasId ? 'Editar Tarea' : 'Nueva Tarea';
  }
  private loadDataIntoForm(): void{
    this.tareasId=Number(this.route.snapshot.paramMap.get('id'));
    if(this.tareasId){
      this.tareasService.getTarea(this.tareasId).subscribe(tarea => {
        this.tareasForm.patchValue(tarea)
      });
    }
  }
  private showSuccessToast(message: string): void{
    Toastify.default ({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style:{
        background: "#189586",
      }

    }).showToast(); 
  }
}
