import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
              private toastController: ToastController) { 

      this.cargarPeliculasFav();
  }



  guardarPeliculaFav(pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas',this.peliculas);

    return !existe;
  }


  async cargarPeliculasFav(){
     const peliculas = await this.storage.get('peliculas');
     this.peliculas = peliculas || [];
     return this.peliculas
  }


  async existePeliculaEnFav(id){
    await this.cargarPeliculasFav();
    const existe = this.peliculas.find( peli => peli.id === id);
    return (existe) ? true : false;
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position:'bottom',
      duration: 1000
    });
    toast.present();
  }


}
