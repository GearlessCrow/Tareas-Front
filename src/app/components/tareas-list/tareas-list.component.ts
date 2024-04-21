import { Component, OnInit } from '@angular/core';
import { Tareas } from '../../models/tareas.model';
import { TareasService } from '../../services/tareas.service';
import * as Toastify from 'toastify-js';


@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrl: './tareas-list.component.scss'
})
export class TareasListComponent implements OnInit {
  tareas: Tareas[] = [];
  total: number =0;
  constructor(
    private tareasService: TareasService
  ){}

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  deleteTareas(id: number): void{
    this.tareasService.deleteTarea(id).subscribe(response =>{
      this.showSuccessToast("Tarea Eliminada");
      this.tareas = this.tareas.filter(tarea=>tarea.id != id);
      this.calculateTotal();
    }

    );
  }
  private loadDataIntoTable(): void{
    this.tareasService.getTareas().subscribe(tareas=>{
      this.tareas = tareas;
      this.calculateTotal();
    });
  }

  private calculateTotal(): void{
    this.total = this.tareas.reduce((accumulated, currentValue)=> {
      return accumulated + Number(currentValue.id);
    }, 0);
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
