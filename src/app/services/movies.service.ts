import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';



const url = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    //https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2020-12-31&api_key=837f10412f0d1d5f37ea802515011e89&language=es&include_image_language=es`
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getFeature(){

    const hoy = new Date();
    const year = hoy.getFullYear();
    const mes = hoy.getMonth() + 1;
    const ultimoDia = new Date( year , mes , 0).getDate(); //ultimo dia del mes
    let mesString;

    if ( mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${year}-${mesString}-01`; //2021-01-01
    const fin = `${year}-${mesString}-${ultimoDia}`; //2021-01-31

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
    
    ;
  }

  getPopulares(){

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }


  getPeliculaDetalle(id: string){
    const query = `/movie/${id}?a=1`;
    return this.ejecutarQuery<PeliculaDetalle>(query);
  }


  getPeliculaActores(id: string){
    const query = `/movie/${id}/credits?a=1`;
    return this.ejecutarQuery<RespuestaCredits>(query);
  }


  buscarPeliculas(text: string){
    const query = `/search/movie?query=${text}`;
    return this.ejecutarQuery(query);
  }

  getGeneros(): Promise<Genre[]>{
    const query = `/genre/movie/list?a=1`;
    return new Promise( (resolve, reject) => {
      this.ejecutarQuery(query)
        .pipe(
           map( (data: any) => data = data['genres'])
        )
      .subscribe( resp => {
        //console.log(resp);
        this.generos = resp;
        resolve(this.generos);
      }, err => reject('Error al cargar generos')
      );
    });   
  }



}
