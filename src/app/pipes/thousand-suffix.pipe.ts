import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffix',
})
export class ThousandSuffixPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    const suffixes = ['k', 'M'];

    if (Number.isNaN(value)) {
      return null;
    }

    if (value < 1000) {
      return value;
    }

    const exp = Math.floor(Math.log(value) / Math.log(1000));

    return (value / Math.pow(1000, exp)).toFixed(args) + ' ' + suffixes[exp - 1];
  }
}
