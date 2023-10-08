export const createHeader = () => {
   let header = document.createElement('header');
   let h1 = document.createElement('h1');
   h1.classList.add('battleship-title');
   h1.textContent = 'Battleship';
   header.append(h1);
   return header;
}

