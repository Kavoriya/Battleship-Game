export const isValidCell = (coord) => {
   if (coord[0] < 0 ||
      coord[1] < 0 ||
      coord[0] > 10 - 1 ||
      coord[1] > 10 - 1) { 
         return false;
   }
   return true;
}