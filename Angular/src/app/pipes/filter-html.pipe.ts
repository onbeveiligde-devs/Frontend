import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHtml'
})
export class FilterHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new DOMParser().parseFromString(value, "text/html").documentElement.textContent;
  }

}
