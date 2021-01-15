import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {


    if (!img){
      return './assets/no-image-banner.jpg';
    }else {     
      return `${url}/${size}${img}`;
    }


  }

}
