import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];
  peliculasPopularesTemp: Pelicula[] = [];

  darkMode: boolean = false;

  
  constructor(private moviesService: MoviesService,
              private navController: NavController) {

                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                this.darkMode = prefersDark.matches;
              }
  ngOnInit() {

    
    
    this.moviesService.getFeature()
      .subscribe( resp => {
        //console.log('Recientes', resp);
        this.peliculasRecientes = resp.results;        
      });
    this.getPopulares();
     
  }

  // funcion para cambiar el modo dark-ligth desde el toggle
  changeColor() {    
    document.body.classList.toggle('dark',this.darkMode);
  }

  cargarMasPopulares(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares()
    .subscribe( resp => {
      //console.log('Populares', resp);
      const temp = [ ...this.peliculasPopulares, ...resp.results];
      this.peliculasPopulares = temp;
      
    });
  }

}
