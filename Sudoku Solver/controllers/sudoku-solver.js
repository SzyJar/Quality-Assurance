class SudokuSolver {

    validate(puzzleString) {
      let validChar = ['.', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      if (!(puzzleString.length === 81)) {
        return 'Expected puzzle to be 81 characters long';
      };
      for (let i = 0; i < puzzleString.length; i++) {
        if (!validChar.includes(puzzleString[i])) {
          return 'Invalid characters in puzzle';
        };
      };
      return true;
    }
  
    checkRowPlacement(puzzleString, row, column, value) {
      for (let i = 0; i < 81; i++) {
        const currentRow = Math.floor(i / 9);
        const currentColumn = i % 9;
    
        if (currentRow === row && currentColumn !== column) {
          if (value === puzzleString[i]) {
            return false;
          };
        };
      };
    
      return true;
    }
  
    checkColPlacement(puzzleString, row, column, value) {
      for (let i = 0; i < 81; i++) {
        const currentRow = Math.floor(i / 9);
        const currentColumn = i % 9;
    
        if (currentRow !== row && currentColumn === column) {
          if (value === puzzleString[i]) {
            return false;
          };
        };
      };
    
      return true;
    }
  
    checkRegionPlacement(puzzleString, row, column, value) {
      for (let i = 0; i < 81; i++) {
        const currentRow = Math.floor(i / 9);
        const currentColumn = i % 9;
        if (currentRow === row && currentColumn === column) {
          if (value === puzzleString[i]) {
            return true;
          } else if (puzzleString[i] !== '.') {
            return false;
          };
        };
      };
      
      const regy = Math.floor(row / 3);
      const regx = Math.floor(column / 3);
    
      let valuesToCheck = puzzleString.slice(27 * regy + 3 * regx, 27 * regy + 3 * regx + 27);
      
      let temp1 = valuesToCheck.slice(0, 3);
      let temp2 = valuesToCheck.slice(9, 12);
      let temp3 = valuesToCheck.slice(18, 21);
      valuesToCheck = [...temp1, ...temp2, ...temp3];
  
      for (let i = 0; i < 81; i++) {  
        if (value === puzzleString[i] && valuesToCheck.includes(value)) {
            return false;
        };
      };
    
      return true;
    }
  
    solve(puzzleString) {
      let puzzle = puzzleString.split('');
      for (let i = 0; i < 81; i++) {
        if (puzzleString[i] === '.') {
          for (let num = 1; num <= 9; num++) {
            if (this.checkRowPlacement(puzzle.join(''), Math.floor(i / 9), (i % 9), String(num))
               && this.checkColPlacement(puzzle.join(''), Math.floor(i / 9), (i % 9), String(num))
               && this.checkRegionPlacement(puzzle.join(''), Math.floor(i / 9), (i % 9), String(num))) {
              puzzle[i] = String(num);
              
              const result = this.solve(puzzle.join(''));
              
              if (result.solution) {
                return { solution: result.solution };
              };
  
              puzzle[i] = '.';
            };
            if (num === 9) {
              return { error: 'Puzzle cannot be solved' };
            };
          };
        };
      };
  
      return { solution: String(puzzle.join('')) };
    };
    
}
  
module.exports = SudokuSolver;
  
  