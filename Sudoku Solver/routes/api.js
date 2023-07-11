'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      };
      
      let validation = solver.validate(puzzle);
      if (validation !== true) {
        return res.json({ error: validation });
      };

      if(!['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) {
        return res.json({ error: 'Invalid value' });
      };
      
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      let coordy = parseInt(letters.indexOf(coordinate[0]));      

      if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(coordinate[1])
         || !letters.includes(coordinate[0])
         || coordinate.length > 2) {
        return res.json({ error: 'Invalid coordinate' });
      };

      let coordx = (parseInt(coordinate[1]) - 1);

      let row = solver.checkRowPlacement(puzzle, coordy, coordx, value);
      let col = solver.checkColPlacement(puzzle, coordy, coordx, value);
      let reg =  solver.checkRegionPlacement(puzzle, coordy, coordx, value);
      

      if (row === true && col === true && reg === true) {
        res.json({ "valid": true });
      } else {
        let conflict = [];
        if (row === false){
          conflict.push('row')
        };
        if (col === false){
          conflict.push('column')
        };
        if (reg === false){
          conflict.push('region')
        };
        res.json({ "valid": false, "conflict": conflict });
      };
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      };
      
      let validation = solver.validate(puzzle);
      if (solver.validate(puzzle) !== true){
        return res.json({ error: validation });
      };
      
      let solution = solver.solve(puzzle);
      res.json(solution);
    });
};
