function ConvertHandler() {
  
    this.getNum = function(input) {
      input = input.trim().toLowerCase();
      input = input.replace(/[a-z]+/, "")
      if (input === '') {
        return 1;
      };
  
      if (!/^(\d+(\.\d*)?|\.\d+)(\/\d+(\.\d*)?)?$/.test(input)) {
        return 'invalid number';
      };
      
      let result = eval(input);
      return result;
    };
    
    this.getUnit = function(input) {
      input = input.trim().toLowerCase();
      let result = input.match(/[a-z]+/gi);
      const validUnits = {
        gal: 'gal',
        l: 'L',
        mi: 'mi',
        km: 'km',
        lbs: 'lbs',
        kg: 'kg'
      };
  
      if (!validUnits.hasOwnProperty(result)) {
        return 'invalid unit';
      } else {
        return validUnits[result[0]];
      };
    };
    
    this.getReturnUnit = function(initUnit) {
      initUnit = initUnit.toLowerCase();
      switch (initUnit) {
        case 'gal':
          return 'L';
        case 'l':
          return 'gal';
        case 'mi':
          return 'km';
        case 'km':
          return 'mi';
        case 'lbs':
          return 'kg';
        case 'kg':
          return 'lbs';
        default:
          return 'invalid unit';
      };
    };
  
    this.spellOutUnit = function(unit) {
      unit = unit.toLowerCase();
      switch (unit) {
        case 'gal':
          return 'gallons';
        case 'l':
          return 'liters';
        case 'mi':
          return 'miles';
        case 'km':
          return 'kilometers';
        case 'lbs':
          return 'pounds';
        case 'kg':
          return 'kilograms';
        default:
          return 'invalid unit';
      };
    };
    
    this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      initUnit = initUnit.toLowerCase();
      let result;
      
      switch (initUnit) {
        case 'gal':
          result = initNum * galToL;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'km':
          result = initNum / miToKm;
          break;
        default:
          result = 'invalid unit';
          break;
      };
  
      return eval(result.toFixed(5));
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      initUnit = this.spellOutUnit(initUnit);
      returnUnit = this.spellOutUnit(returnUnit);
      return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    }; 
};
  
module.exports = ConvertHandler;
  