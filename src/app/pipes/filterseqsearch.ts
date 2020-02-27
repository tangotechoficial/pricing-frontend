import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterseqsearch'
})
export class FilterPipeSeqSearch implements PipeTransform {
    transform(items: any[], searchSeqInput: string): any[] {
        if (!items) return [];
        if (!searchSeqInput) return items;
        searchSeqInput = searchSeqInput.toLowerCase();
        return items.filter(it => {
            return it.sDesAcceso.toLowerCase().includes(searchSeqInput);
        });
    }
}