import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  lista:Lista[]=[];
  constructor() { 
    console.log('Servicio listo.')
    this.cargarStorage();
    
  }
  
  crearLista(titulo:string){
    const nuevaLista=new Lista(titulo);
    this.lista.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(id:string|null){
    const idLista=Number(id);
    const listaCargada=this.lista.find(l=>l.id===idLista);
    return listaCargada;
  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.lista));
  }

  cargarStorage(){
    if(localStorage.getItem('data')!=null){
      this.lista=JSON.parse(localStorage.getItem('data')||'[]');
    }
  }

  borrarLista(id:number){
    this.lista=this.lista.filter(li=>li.id!=id);
  }
}
