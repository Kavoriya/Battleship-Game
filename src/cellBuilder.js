export class CellBuilder {
   constructor(row, cell) {
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      let cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.row = row;
      cellDiv.dataset.column = cell;

      if (row == 0) {
         let letterSpan = document.createElement('span');
         letterSpan.classList.add('column-letter');
         letterSpan.textContent = letters[cell];
         cellDiv.append(letterSpan);
      }

      if (cell == 0) {
         let digitSpan = document.createElement('span');
         digitSpan.classList.add('row-digit');
         digitSpan.textContent = row + 1;
         cellDiv.append(digitSpan);
      }

      return cellDiv;
   }
}