import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() loadData = new EventEmitter<boolean>();

  slideOpts = {
    slidesPerView: 3.3, 
    freeMode: true  
  }
  

  constructor(private modalController: ModalController) { }

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
    const { data } = await modal.onWillDismiss();
    if  (data.clickFavorito){
      this.loadData.emit(true);
    }

  }
    

}
