import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    let p: string;
    switch (value.getMonth() + 1)
    {
      case 1:
       p = 'Января';
       break;
        case 2:
          p = 'Февраля';
          break;
           case 3:
       p = 'Марта';
       break;
        case 4:
       p = 'Апреля';
       break;
        case 5:
       p = 'Мая';
       break;
        case 6:
       p = 'Июня';
       break;
        case 7:
       p = 'Июля';
       break;
        case 8:
       p = 'Августа';
       break;
        case 9:
       p = 'Сентября';
       break;
        case 10:
          p = 'Октября';
          break;
           case 11:
       p = 'Ноября';
       break;
        case 12:
       p = 'Декабря';
       break;

    }
    return `${value.getDate()} ${p} ${value.getFullYear()}, ${value.getHours()}:${value.getMinutes()}`;
  }

}
