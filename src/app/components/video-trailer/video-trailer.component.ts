import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaVideo } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';
import { environment } from '../../../environments/environment';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

const youtubeUrl = environment.youtubeUrl;

@Component({
  selector: 'app-video-trailer',
  templateUrl: './video-trailer.component.html',
  styleUrls: ['./video-trailer.component.scss'],
})
export class VideoTrailerComponent implements OnInit {

  @Input() id: string; 
  peliculas: PeliculaVideo[] = [];

  constructor(private modalController: ModalController,
              private moviesService: MoviesService,
              //private youtube: YoutubeVideoPlayer
              ) { 
                                
              }

  ngOnInit() {
    this.cargarTrailers()
   
  }

  cargarTrailers(){
    this.moviesService.getVideo(this.id)
      .subscribe( resp => {
        console.log(this.peliculas); 
        this.peliculas = resp.results;
        console.log(this.peliculas); 
      })
  }

  ver(key: string){
    const url = `${youtubeUrl}${key}`
    console.log(url);
   // this.youtube.openVideo(key);
  }

  
  dismiss() {
    this.modalController.dismiss();
  }

}
