import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    // if search input is empty then toLowerCase() cant be used thus we will use args else we convert search input value to lower case
    if(args[0]===undefined){
      args = args
    }
    else{
      args = args[0].toLowerCase();
    }

    // Filter the product list by checking if each product's name includes search value if yes product is returned else not
    return value.filter((each:any)=>{return each.name.toLowerCase().includes(args)});
  }

}
