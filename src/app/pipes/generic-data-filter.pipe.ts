import { Pipe, PipeTransform, Injectable } from '@angular/core'

@Pipe({
  name: 'filter'
}
)
@Injectable()
export class GenericDadaFilterPipe implements PipeTransform {

  /**
   * Search for corresponding filter values on given item object
   * @param filter  object the filter object
   * @param keys array a list of object keys
   * @param item any an object of any type
   */
  private processItemByFilterKeys(filter, keys, item) {
    let result = []
    for(let i=0; i< keys.length; i++) {
      let filterVal: any
      if(keys[i].toLowerCase() == 'codprd') {
        filterVal = filter[keys[i].toLowerCase()].split('-')[0]
        console.log(filterVal)
      } else {
        filterVal = filter[keys[i].toLowerCase()]
      }
      if(item[keys[i]] == filterVal) {
        result.push(true)
      }else{
        result.push(false)
      }
    }
    return result
  }
  /**
   *
   * @param items An array of objects
   * @param args The filter object.
   * @param and If true, the object should search exclusively by items having property values equals to those ones found on filter object
   *  if false, filter will search for any item with at least a single correspondency with the filter
   */
  transform(items: any[], args: any, and: boolean=false): any[] {

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

      Object.keys(args).forEach(key => args[key] === undefined || args[key] === null ? delete args[key] : {});

      const kargs = Object.keys(args).map((str) => { return str.toUpperCase() })
      const keys = kargs.filter(
        (key) => {
          if(i.hasOwnProperty(key)){
            return key
          }
      })

      if (and) {
        return items.filter(item => {
          return this.processItemByFilterKeys(args, keys, item).every( k => {return k == true})
        })
      }
      return items.filter(item => {
        return keys.some(
          (key) => {
          return new RegExp(args[key.toLowerCase()], 'gi').test(item[key]) || args[key.toLowerCase()] == ""
          }
        )
      })


  }
}
