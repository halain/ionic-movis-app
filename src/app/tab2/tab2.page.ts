import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  buscando: boolean = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  constructor(private moviesService: MoviesService,
              private modalController: ModalController) {}

  buscar(event){
    const valor: string =  event.detail.value
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesService.buscarPeliculas(valor)
      .subscribe( (resp: any) => {
        console.log(resp);
        
        this.peliculas = resp['results'];
        this.buscando = false;
      })
    
  }


  async verDetalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      cssClass: "my-custom-class",
      componentProps: {
        id
      },
    });
    await modal.present();
  }


}
