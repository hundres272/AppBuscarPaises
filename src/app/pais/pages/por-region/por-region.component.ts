import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  regionActiva: string = '';
  hayError:boolean = false;
  paises:Country[] = [];

  constructor(private regionService:PaisService) { }

  ngOnInit(): void {
  }

  activarRegion(region:string){
    if(region!==this.regionActiva){
      this.paises = [];
      this.regionActiva = region;
      this.regionService.buscarPorRegion(region)
        .subscribe(res=>{
          this.paises = res;
        },err=>{
          this.hayError = true;
          this.paises = [];
        })
    }
  }

}
