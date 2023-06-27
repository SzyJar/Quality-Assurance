const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function (done) {
    const input = '10';
    assert.strictEqual(convertHandler.getNum(input), 10);
    done();
  });

  test('convertHandler should correctly read a decimal number input', function (done) {
    const input = '2.5';
    assert.strictEqual(convertHandler.getNum(input), 2.5);
    done();
  });

  test('convertHandler should correctly read a fractional input', function (done) {
    const input = '3/4';
    assert.strictEqual(convertHandler.getNum(input), 0.75);
    done();
  });

  test('convertHandler should correctly read a fractional input with a decimal', function (done) {
    const input = '1.5/2.5';
    assert.strictEqual(convertHandler.getNum(input), 0.6);
    done();
  });

  test('convertHandler should correctly return an error on a double-fraction', function (done) {
    const input = '3/2/3';
    assert.strictEqual(convertHandler.getNum(input), 'invalid number');
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
    const input = 'mi';
    assert.strictEqual(convertHandler.getNum(input), 1);
    done();
  });

  test('convertHandler should correctly read each valid input unit', function (done) {
    const input = 'gal';
    assert.strictEqual(convertHandler.getUnit(input), 'gal');
    done();
  });

  test('convertHandler should correctly return an error for an invalid input unit', function (done) {
    const input = '4invalid';
    assert.strictEqual(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  test('convertHandler should return the correct return unit for each valid input unit', function (done) {
    const input = 'gal';
    assert.strictEqual(convertHandler.getReturnUnit(input), 'L');
    done();
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function (done) {
    const input = 'mi';
    assert.strictEqual(convertHandler.spellOutUnit(input), 'miles');
    done();
  });

  test('convertHandler should correctly convert gal to L', function (done) {
    const initNum = 1;
    const initUnit = 'gal';
    assert.strictEqual(convertHandler.convert(initNum, initUnit), 3.78541);
    done();
  });

  test('convertHandler should correctly convert L to gal', function (done) {
    const initNum = 1;
    const initUnit = 'L';
    assert.strictEqual(convertHandler.convert(initNum, initUnit), 0.26417);
    done();
  });

  test('convertHandler should correctly convert mi to km', function (done) {
    const initNum = 1;
    const initUnit = 'mi';
    assert.strictEqual(convertHandler.convert(initNum, initUnit), 1.60934);
    done();
  });

  test('convertHandler should correctly convert km to mi', function (done) {
    const initNum = 1;
    const initUnit = 'km';
    assert.strictEqual(convertHandler.convert(initNum, initUnit), 0.62137);
    done();
  });
  
  test('convertHandler should correctly convert lbs to kg', function (done) {
    const initNum = 1;
    const initUnit = 'lbs';
    assert.approximately(convertHandler.convert(initNum, initUnit), 0.45359, 0.1);
    done();
  });

  test('convertHandler should correctly convert kg to lbs', function (done) {
    const initNum = 1;
    const initUnit = 'kg';
    assert.approximately(convertHandler.convert(initNum, initUnit), 2.20462, 0.1);
    done();
  });

});
