function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input || typeof input !== 'string') return undefined;
    let charIndex = input.search(/[a-zA-Z]/);
    
    let numStr;
    if (charIndex === 0) {
      return 1;
    } else if (charIndex === -1) {
      numStr = input.trim();
    } else {
      numStr = input.slice(0, charIndex).trim();
    }

    if (numStr === '') {
      return 1;
    }

    let slashes = numStr.split('/');
    if (slashes.length > 2) {
      return undefined;
    }

    if (slashes.length === 2) {
      let numStr0 = slashes[0].trim();
      let numStr1 = slashes[1].trim();
      if (numStr0 === '' || numStr1 === '') {
        return undefined;
      }
      let num = Number(numStr0);
      let den = Number(numStr1);
      if (isNaN(num) || isNaN(den) || den === 0) {
        return undefined;
      }
      return num / den;
    }

    let num = Number(numStr);
    if (isNaN(num)) {
      return undefined;
    }
    return num;
  };
  
  this.getUnit = function(input) {
    if (!input || typeof input !== 'string') return undefined;
    let charIndex = input.search(/[a-zA-Z]/);
    if (charIndex === -1) return undefined;

    let unit = input.slice(charIndex).trim().toLowerCase();
    switch (unit) {
      case 'gal':
        return 'gal';
      case 'l':
        return 'L';
      case 'mi':
        return 'mi';
      case 'km':
        return 'km';
      case 'lbs':
        return 'lbs';
      case 'kg':
        return 'kg';
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit || typeof initUnit !== 'string') return undefined;
    let unit = initUnit.toLowerCase();
    switch (unit) {
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
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    if (!unit || typeof unit !== 'string') return undefined;
    let u = unit.toLowerCase();
    switch (u) {
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
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum === undefined || initNum === null || isNaN(initNum) || !initUnit || typeof initUnit !== 'string') {
      return undefined;
    }

    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
  
}

module.exports = ConvertHandler;
