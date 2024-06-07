import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-items.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista?:Lista;
  item:string='';
  constructor(private deseosService:DeseosService, private router:ActivatedRoute) {
    const id=this.router.snapshot.paramMap.get('id');
    const listaFind=this.deseosService.obtenerLista(id);
    if(listaFind){
      this.lista=listaFind;
      console.log(this.lista)
    }
    
   }

  ngOnInit() {
  }

  agregarItem(){
    if(this.item.length===0){
      return;
    }
    const nuevoItem=new ListaItem(this.item);
    this.lista?.items.push(nuevoItem);
    this.item='';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item:ListaItem){
    if(this.lista){
      const pendientes=this.lista.items.filter(it=>it.completado==false).length
      if(pendientes==0){
        this.lista.terminadaEn=new Date();
        this.lista.estado=true;
      }else{
        this.lista.terminadaEn=undefined;
        this.lista.estado=false;
      }
    }
    this.deseosService.guardarStorage();
  }

  borrar(i:number){
    if(this.lista){
      this.lista.items.splice(i,1);
    }
    this.deseosService.guardarStorage();
  }
}
