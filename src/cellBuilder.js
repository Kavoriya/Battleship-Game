export class CellBuilder {
   constructor(row, cell) {
      let tD = document.createElement('td');
      tD.classList.add('cell');
      tD.dataset.row = row;
      tD.dataset.column = cell;
      return tD;
   }
}