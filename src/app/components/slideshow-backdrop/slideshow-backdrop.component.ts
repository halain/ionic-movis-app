import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: "app-slideshow-backdrop",
  templateUrl: "./slideshow-backdrop.component.html",
  styleUrls: ["./slideshow-backdrop.component.scss"],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.08, //muestra una parte del siguiente slide que se muestra a la derecha
    freeMode: true, //el slide se mueve seguido, en false se mueve exacto por cada card
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

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
