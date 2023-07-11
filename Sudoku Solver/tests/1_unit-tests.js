const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
  
  test('Logic handles a valid puzzle string of 81 characters', function (done) {
    assert.strictEqual(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), true);
    done();
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
    assert.strictEqual(solver.validate('5..91372.3.g.8.5.9.9.25..8.68.47.23.b.95..46.7.4.....5.2..s....4..8916..85.72...3'), 'Invalid characters in puzzle');
    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
    assert.strictEqual(solver.validate('5..91372.3...8.5.9.9.25..8.68.47'), 'Expected puzzle to be 81 characters long');
    done();
  });

  test('Logic handles a valid row placement', function (done) {
    assert.strictEqual(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '6'), true);
    done();
  });

  test('Logic handles an invalid row placement', function (done) {
    assert.strictEqual(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '5'), false);
    done();
  });

  test('Logic handles a valid column placement', function (done) {
    assert.strictEqual(solver.checkColPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '6'), true);
    done();
  });

  test('Logic handles a invalid column placement', function (done) {
    assert.strictEqual(solver.checkColPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '8'), false);
    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', function (done) {
    assert.strictEqual(solver.checkRegionPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '6'), true);
    done();
  });

  test('Logic handles a invalid region (3x3 grid) placement', function (done) {
    assert.strictEqual(solver.checkRegionPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3', 0, 1, '5'), false);
    done();
  });

  test('Valid puzzle strings pass the solver', function (done) {
    assert.deepEqual(solver.solve('473891265851726394926345817568913472342687951197254638734162589685479123219538746'),
                 { "solution" : "473891265851726394926345817568913472342687951197254638734162589685479123219538746" });
    assert.deepEqual(solver.solve('135762984946381257728459613694517832812936745357824196473298561581673429269145378'),
                 { "solution" : "135762984946381257728459613694517832812936745357824196473298561581673429269145378" });
    done();
  });

  test('Invalid puzzle strings fail the solver', function (done) {
    assert.deepEqual(solver.solve('..839.7.575.....964..1.1..1..16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'),
                 { "error" : "Puzzle cannot be solved" });
    assert.deepEqual(solver.solve('5.591372.3.5.8.5.9.9.25..8.68.47.23.5.95..46.7.4.....5.2.5.....4..8916..85.72...3'),
                 { "error" : "Puzzle cannot be solved" });
    done();
  });

  test('Solver returns the expected solution for an incomplete puzzle', function (done) {
    assert.deepEqual(solver.solve('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'),
                 { "solution" : "827549163531672894649831527496157382218396475753284916962415738185763249374928651" });
    done();
  });
  
});
