import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(args[0]===undefined){
      args = args
    }
    else{
      args = args[0].toLowerCase();
    }

    return value.filter((each:any)=>{return each.name.toLowerCase().includes(args)});
  }

}
