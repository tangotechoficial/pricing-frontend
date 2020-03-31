import { Pipe, PipeTransform, Injectable } from '@angular/core'

@Pipe({
  name: 'filter'
}
)
@Injectable()
export class GenericDadaFilterPipe implements PipeTransform {

  transform(items: any[], args: any, filterDefault: boolean=false): any[] {

      if (!items) {
        return []
      }
      if (!args ) {
        return items;
      }

      const isEmpty = !Object.values(args).some(x => (x !== null && x !== ''));

      if(isEmpty){
        return items
      }

      const i = items[0]
      
      if(!i) {
        return items;
      }
      
      const kargs = Object.keys(args).map((str) => { return str.toUpperCase() })
      const keys = kargs.filter(
        (key) => {
          if(i.hasOwnProperty(key)){
            return key
          }
      })

      if (filterDefault) {
        return items.filter(item =>
          keys.reduce((x, key) =>{
            return (x && new RegExp(args[key.toLowerCase()], 'gi').test(item[key])) || args[key.toLowerCase()] == ""
          }, true))
      }
      return items.filter(item => {
        return keys.some((key) => {
          return new RegExp(args[key.toLowerCase()], 'gi').test(item[key]) || args[key.toLowerCase()] == ""
        })
      })

  }
}