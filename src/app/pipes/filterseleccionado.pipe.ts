import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterseleccionado'
})
export class FilterPipeSeleccionadoAcceso implements PipeTransform {
    transform(items: any[], searchSeleccionado: string): any[] {
        if (!items) return [];
        if (!searchSeleccionado) return items;
        searchSeleccionado = searchSeleccionado.toLowerCase();
        return items.filter(it => {
            return it.tipo.toLowerCase().includes(searchSeleccionado);
        });
    }
}