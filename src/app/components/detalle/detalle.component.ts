import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Crew, Cast } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string; 
  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  caracteres = 150;
  esFavorito = 'heart-outline';
  clickFavorito: boolean = false;

  slideActoresOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private modalController: ModalController,
              private moviesService: MoviesService,
              private dataLocalService: DataLocalService  ) { }

  ngOnInit() {

    this.dataLocalService.existePeliculaEnFav(this.id)
      .then( existe => this.esFavorito = (existe) ? 'heart' : 'heart-outline' );
    
    this.getDetalle();
    this.getActores();
  }


  getDetalle(){
    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
        //console.log('Pelicula-Detalle', resp);
        this.pelicula = resp;
      })
  }

  getActores(){
    this.moviesService.getPeliculaActores(this.id)
      .subscribe( resp => {
        //console.log('Pelicula-Actores',resp);
        this.actores = resp.cast;
      })
  }

  dismiss() {
    this.modalController.dismiss({
      clickFavorito: this.clickFavorito
    });
  }

  favorito(){
    this.clickFavorito = true;
    const existe = this.dataLocalService.guardarPeliculaFav(this.pelicula);
    this.esFavorito = (existe) ? 'heart' : 'heart-outline';    
  }


}
