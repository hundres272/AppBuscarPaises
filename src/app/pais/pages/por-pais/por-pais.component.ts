import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino:string = "";
  hayError:boolean = false;
  paises:Country[] = [];
  paisesSugeridos:Country[] = [];
  activarDebounce:boolean = true;

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino:string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino)
      .subscribe(res=>{
        console.log(res)
        this.paises = res;
        this.activarDebounce = false;
      },err=>{
        this.hayError = true;
        this.paises = [];
      })
      
    }
    
    sugerencias(termino:string){
      this.hayError = false;
      this.activarDebounce = true;
      this.paisService.buscarPais(termino)
        .subscribe(
          paises=>this.paisesSugeridos=paises.splice(0,3),
          (err) => this.paisesSugeridos = []
      )
  }
}
