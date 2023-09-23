import { isValidCell } from "./cellValidator.js";

export const findEdges = (coord) => {
   let edges = [];
   let edgesRaw = [];
   let north = [coord[0] - 1, coord[1]];
   let northEast = [coord[0] - 1, coord[1] + 1];
   let east = [coord[0], coord[1] + 1];
   let southEast = [coord[0] + 1, coord[1] + 1];
   let south = [coord[0] + 1, coord[1]];
   let southWest = [coord[0] + 1, coord[1] - 1];
   let west = [coord[0], coord[1] - 1];
   let northWest = [coord[0] - 1, coord[1] - 1];
   edgesRaw.push(north, northEast, east, 
      southEast, south, southWest, 
      west, northWest, coord);
   edgesRaw.forEach(edge => {
      if (isValidCell(edge)) {
         edges.push(edge);
      }
   })
   return edges;
}