import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, PeliculasFavorito, Pelicula } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculasFav: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: PeliculasFavorito[] = []

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }

  constructor(private dataLocalService: DataLocalService,
              private moviesService: MoviesService) { 

              }


  ngOnInit() { }
  
  //Del ciclo de vida de Ionic. Se dispara cada vez que se entra en la pagina
   ionViewWillEnter(){
    this.loadData(); 
  }


  async loadData(){
    this.peliculasFav = await this.dataLocalService.cargarPeliculasFav();
    this.generos = await this.moviesService.getGeneros();
    this.pelisGenero(this.generos, this.peliculasFav);    
    // console.log('Fav refrescado',this.peliculasFav);
  }

  //Metodo para agrupar las peliculas por su genero
  pelisGenero(generos: Genre[], peliculas: PeliculaDetalle[]){

    this.favoritoGenero = [];

    generos.forEach( genero => {
      
        this.favoritoGenero.push({
          id: genero.id,
          genero: genero.name,
          peliculas: peliculas.filter(  peli => {
            return peli.genres.find( gen => gen.id === genero.id)
          })
        })
      
    });

  }




}
