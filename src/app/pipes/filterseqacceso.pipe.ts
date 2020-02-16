import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterseqacceso'
})
export class FilterPipeSeqAcceso implements PipeTransform {
    transform(items: any[], searchSeq: string): any[] {
        if (!items) return [];
        if (!searchSeq) return items;
        searchSeq = searchSeq.toLowerCase();
        return items.filter(it => {
            return it.tipo.toLowerCase().includes(searchSeq);
        });
    }
}