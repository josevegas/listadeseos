import { ListaItem } from "./lista-items.model";

export class Lista{
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn?: Date;
    estado: boolean;
    items:ListaItem[];

    constructor(titulo:string){
        this.titulo=titulo;
        this.creadaEn=new Date();
        this.items=[];
        this.estado=false;
        this.id=new Date().getTime();
    }
}