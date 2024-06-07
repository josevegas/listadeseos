import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {
  @ViewChild(IonList)lista!: IonList;
  @Input() terminados=true;
  constructor(public deseosService:DeseosService, private router:Router, private alertController:AlertController) {
    
   }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    const id=lista.id;
    if(this.terminados){
      this.router.navigateByUrl(`/tabs/terminados/agregar/${id}`)
    }else{
      this.router.navigateByUrl(`/tabs/pendientes/agregar/${id}`)
    }
  }

  borrar(id:number){
    this.deseosService.borrarLista(id);
    this.deseosService.guardarStorage();
  }

  async editarNombre(lista:Lista){
    const alert= await this.alertController.create({
      header: 'Actualizar nombre',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: `${lista.titulo}`,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>this.lista.closeSlidingItems(),
        },
        {
          text: 'Actualizar',
          handler: (data)=>{
            console.log(data);
            lista.titulo=data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ],
    });
    await alert.present();
  }
}
