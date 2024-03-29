import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {


  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.1, 
    freeMode: true,
    spaceBetween: -10 
  }
  

  constructor(private modalController: ModalController) { }

  ngOnInit() {}



  onClick(){
    this.cargarMas.emit()    
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
