export const randomizeDirections = () => {
   let directions = [1, 2, 3, 4];
      for (var i = directions.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = directions[i];
         directions[i] = directions[j];
         directions[j] = temp;
     }
   return directions;
}