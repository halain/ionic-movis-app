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

  
  constructor(private moviesService: MoviesService,
              private navController: NavController) {}
  ngOnInit() {
    
    this.moviesService.getFeature()
      .subscribe( resp => {
        //console.log('Respuesta',resp);
        this.peliculasRecientes = resp.results;        
      });
    this.getPopulares();
     
  }


  cargarMasPopulares(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares()
    .subscribe( resp => {
      const temp = [ ...this.peliculasPopulares, ...resp.results];
      this.peliculasPopulares = temp;
    });
  }

}
