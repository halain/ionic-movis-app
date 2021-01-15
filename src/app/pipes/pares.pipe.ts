import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para transformar un array en pares, convierte en arreglo de entrada en un arreglo con arreglos en pares
 * 
 * arr[]= [{nama: Pedro, edad:5}, {nama: Maria, edad:6}, {nama: Jose, edad:53}, {nama: Luis, edad:23}]
 * arrPares[]= [ [{nama: Pedro, edad:5}, {nama: Maria, edad:6}] , [{nama: Jose, edad:53}, {nama: Luis, edad:23}] ]
 */

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform(arr: any[]): any[] {
   
    const pares = arr.reduce( (result, value, index, array) => {

      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    return pares;


  }

}
