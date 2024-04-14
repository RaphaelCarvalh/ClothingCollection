import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompany',
  pure: false
})

export class FilterCompany implements PipeTransform {
  transform(value: any[], filter: Object): any[] {
    if (!value || !filter){
      return value;
    }

    return value.filter(company => company.id == localStorage.getItem('userIdCompany'));
  }
}
