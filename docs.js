module.exports = [
  {
    "since": "v3.2.0",
    "category": "Combo",
    "title": "creditCard",
    "examples": [
      "const result = creditCard('4111111111111111'); // => true\rconst result = creditCard('AB4111111111111111'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The credit card number value to validate",
        "name": "val"
      }
    ],
    "syntax": "creditCard(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { creditCard } = require('simply_valid/combo')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { creditCard } from 'simply_valid/combo'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/combo.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/combo/index.js\"></script>"
      }
    }
  },
  {
    "since": "v3.2.0",
    "category": "Combo",
    "title": "date",
    "examples": [
      "const result = date('01/19'); // => true\rconst result = date('01/15/2019'); // => true\rconst result = date('2019/01/05'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The date string value to validate",
        "name": "val"
      }
    ],
    "syntax": "date(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { date } = require('simply_valid/combo')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { date } from 'simply_valid/combo'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/combo.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/combo/index.js\"></script>"
      }
    }
  },
  {
    "since": "v3.2.0",
    "category": "Combo",
    "title": "cvn",
    "examples": [
      "const result = cvn('333'); // => true\rconst result = cvn('4444'); // => true\rconst result = cvn('55555'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The cvn string to run validation against",
        "name": "val"
      }
    ],
    "syntax": "cvn(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { cvn } = require('simply_valid/combo')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { cvn } from 'simply_valid/combo'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/combo.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/combo/index.js\"></script>"
      }
    }
  },
  {
    "since": "v3.2.0",
    "category": "Combo",
    "title": "zipOrPostal",
    "examples": [
      "const result = zipOrPostal('55555'); // => true\rconst result = zipOrPostal('K1A0B1'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The zip or postal code string to validate",
        "name": "val"
      }
    ],
    "syntax": "zipOrPostal(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { zipOrPostal } = require('simply_valid/combo')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { zipOrPostal } from 'simply_valid/combo'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/combo.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/combo/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasValue",
    "examples": [
      "const result = hasValue('11'); // => true\rconst result = hasValue(''); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Any"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasValue(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasValue } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasValue } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasNumbers",
    "examples": [
      "const result = hasNumbers('11'); // => true\rconst result = hasNumbers('eew2211'); // => true\rconst result = hasNumbers('eerrt'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasNumbers(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasNumbers } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasNumbers } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasLetters",
    "examples": [
      "const result = hasLetters('11'); // => false\rconst result = hasLetters('eew2211'); // => true\rconst result = hasLetters('eerrt'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasLetters(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasLetters } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasLetters } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasSpecialCharacters",
    "examples": [
      "const result = hasSpecialCharacters('11%%$#'); // => true\rconst result = hasSpecialCharacters('eew2211!@'); // => true\rconst result = hasSpecialCharacters('eerrt'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasSpecialCharacters(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasSpecialCharacters } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasSpecialCharacters } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasNumbersOrSpecials",
    "examples": [
      "const result = hasNumbersOrSpecials('11%%$#'); // => true\rconst result = hasNumbersOrSpecials('eew2211!@'); // => true\rconst result = hasNumbersOrSpecials('eerrt'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasNumbersOrSpecials(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasNumbersOrSpecials } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasNumbersOrSpecials } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Has",
    "title": "hasUpperAndLowerCase",
    "examples": [
      "const result = hasUpperAndLowerCase('11%%$#'); // => false\rconst result = hasUpperAndLowerCase('Eew2211!@'); // => true\rconst result = hasUpperAndLowerCase('eERrt'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "hasUpperAndLowerCase(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { hasUpperAndLowerCase } = require('simply_valid/has')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { hasUpperAndLowerCase } from 'simply_valid/has'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/has.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/has/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isDate",
    "examples": [
      "const result = isDate('1/2/2019'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isDate(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isDate } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isDate } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isDateShort",
    "examples": [
      "const result = isDateShort('1/19'); // => true\rconst result = isDateShort('13/19'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isDateShort(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isDateShort } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isDateShort } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isDateProper",
    "examples": [
      "const result = isDateProper('2019/1/2'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isDateProper(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isDateProper } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isDateProper } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isEmail",
    "examples": [
      "const email = isEmail('default');\rconst result = email('dusty@gmail.com'); // => true\r\r// OR\r\rconst result = isEmail('default', 'dusty@gmail.com'); // => true\rconst result = isEmail('default')('dusty@gmail.com'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "RegExp",
            "String"
          ]
        },
        "description": "Accepts a RegexExp or the 'default' string to use the default regex",
        "name": "email"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isEmail(email, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isEmail } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isEmail } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isNumber",
    "examples": [
      "const result = isNumber('2'); // => true\rconst result = isNumber(2); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String",
            "Number"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isNumber(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isNumber } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isNumber } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isPositive",
    "examples": [
      "const result = isPositive('2'); // => true\rconst result = isPositive(2); // => true\rconst result = isPositive(-2); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String",
            "Number"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isPositive(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isPositive } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isPositive } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isNegative",
    "examples": [
      "const result = isNegative('-2'); // => true\rconst result = isNegative(-2); // => true\rconst result = isNegative(2); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String",
            "Number"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isNegative(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isNegative } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isNegative } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isVin",
    "examples": [
      "const vin = isVin('default');\rconst result = vin('JM1CW2BL8C0127808'); // => true\r\r// OR\r\rconst result = isVin('default', 'JM1CW2BL8C0127808'); // => true\rconst result = isVin('default')('JM1CW2BL8C0127808'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "RegExp",
            "String"
          ]
        },
        "description": "Accepts a RegexExp or the 'default' string to use the default regex",
        "name": "vin"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isVin(vin, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isVin } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isVin } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isZip",
    "examples": [
      "const result = isZip('44444'); // => true\rconst result = isZip('232'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isZip(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isZip } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isZip } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isCAPostalCode",
    "examples": [
      "const result = isCAPostalCode('K1A0B1'); // => true\rconst result = isCAPostalCode('44444'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isCAPostalCode(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isCAPostalCode } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isCAPostalCode } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isPhone",
    "examples": [
      "const result = isPhone('555-666-7777'); // => true\rconst result = isPhone('5556667777'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isPhone(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isPhone } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isPhone } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isLicensePlate",
    "examples": [
      "const result = isLicensePlate('SSS1829'); // => true\rconst result = isLicensePlate('SSS-1829'); // => true\rconst result = isLicensePlate('SSSS 188'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isLicensePlate(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isLicensePlate } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isLicensePlate } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isVisaCard",
    "examples": [
      "const isVisa = isVisaCard(true);\rconst result = isVisa('4111111111111111'); // => true\r\r// OR\r\rconst result = isVisaCard(true, '4111111111111111'); // => true\rconst result = isVisaCard(true)('4111111111111111'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isVisaCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isVisaCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isVisaCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isVisaPanCard",
    "examples": [
      "const visaPan = isVisaPanCard(true);\rconst result = visaPan('4111111111111111222'); // => false\r\r// OR\r\rconst result = isVisaPanCard(true, '4111111111111111222'); // => false\rconst result = isVisaPanCard(true)('4111111111111111222'); // => false\rconst result = isVisaPanCard(false)('4111111111111111222'); // => true\r// Since the provided number is a fake the luhn algorithm will fail it"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isVisaPanCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isVisaPanCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isVisaPanCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isMasterCard",
    "examples": [
      "const master = isMasterCard(true);\rconst result = master('5511111111111111'); // => false\r\r// OR\r\rconst result = isMasterCard(true, '5511111111111111'); // => false\rconst result = isMasterCard(true)('5511111111111111'); // => false\r// Since the provided number is a fake the luhn algorithm will fail it"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isMasterCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isMasterCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isMasterCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v3.2.0",
    "category": "Is",
    "title": "isAmexCard",
    "examples": [
      "const amex = isAmexCard(true);\rconst result = amex('341111111111111'); // => false\r\r// OR\r\rconst result = isAmexCard(true, '341111111111111'); // => false\rconst result = isAmexCard(true)('341111111111111'); // => false\rconst result = isAmexCard(false)('341111111111111'); // => true\r// Since the provided number is a fake the luhn algorithm will fail it"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isAmexCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isAmexCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isAmexCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isAmericanExpressCard",
    "examples": [
      "const isAmex = isAmericanExpressCard(true);\rconst result = isAmex('341111111111111'); // => false\r\r// OR\r\rconst result = isAmericanExpressCard(true, '341111111111111'); // => false\rconst result = isAmericanExpressCard(true)('341111111111111'); // => false\rconst result = isAmericanExpressCard(false, '341111111111111'); // => true\r// Since the provided number is a fake the luhn algorithm will fail it"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isAmericanExpressCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isAmericanExpressCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isAmericanExpressCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isDiscoverCard",
    "examples": [
      "const discover = isDiscoverCard(true);\rconst result = discover('6111111111111111'); // => false\r\r// OR\r\rconst result = isDiscoverCard(true, '6111111111111111'); // => false\rconst result = isDiscoverCard(true)('6111111111111111'); // => false\rconst result = isDiscoverCard(false, '6111111111111111'); // => true\r// Since the provided number is a fake the luhn algorithm will fail it"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Determines if the card should be strictly validated",
        "name": "strict"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "isDiscoverCard(strict, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isDiscoverCard } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isDiscoverCard } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isBelowMax",
    "examples": [
      "const below = isBelowMax(20);\rconst result = below('19'); // => true\r\r// OR\r\rconst result = isBelowMax(20, '19'); // => true\rconst result = isBelowMax(20)('19'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Number"
          ]
        },
        "description": "The max to validate against",
        "name": "m"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate with",
        "name": "val"
      }
    ],
    "syntax": "isBelowMax(m, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isBelowMax } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isBelowMax } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Is",
    "title": "isAboveMin",
    "examples": [
      "const above = isAboveMin(15);\rconst result = above('19'); // => true\r\r// OR\r\rconst result = isAboveMin(15, '19'); // => true\rconst result = isAboveMin(15)('19'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Number"
          ]
        },
        "description": "The min to validate against",
        "name": "m"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate with",
        "name": "val"
      }
    ],
    "syntax": "isAboveMin(m, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { isAboveMin } = require('simply_valid/is')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { isAboveMin } from 'simply_valid/is'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/is.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/is/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Main",
    "title": "simplyValid",
    "examples": [
      "// Simple validation schemas\r\rconst validate = simplyValid({\r\n    schema: 'hasValue'\r\n  });\r\n\r\n  validate('test'); // => { isValid: true }\r\n  validate(''); // => { isValid: false, story: [{ test: 'hasValue', value: '' }] }\r\n  simplyValid({\r\n    schema: 'hasValue'\r\n  }, 'test'); // => { isValid: true }\r\r// Array Validation Schemas\r\rconst validate = simplyValid({\r schema: ['hasValue', 'hasNumber']\r});\rvalidate('test1123'); // => { isValid: true }\rvalidate('test'); // => { isValid: false, story: [{ test: 'hasNumbers', value: 'test' }] }\r\r// Object Validation Schema\r\rconst validate = simplyValid({\r schema: {\r   test: ['hasNumbers', 'hasLetters'],\r   thing: 'hasValue',\r   nestedThing: ['isPositive', 'hasNumbers']\r }\r});\rvalidate({\r  test: 'cool112',\r  thing: 'test',\r  other: {\r    nestedThing: '1234'\r  }\r}); // => { isValid: true }"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Object"
          ]
        },
        "description": "Returns an object with a isValid prop telling if validation was a success, and a story which is an array of objects of which validation methods failed"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Object"
          ]
        },
        "description": "The main options to setup simply_valid",
        "name": "options"
      },
      {
        "type": {
          "names": [
            "Any"
          ]
        },
        "description": "The data that we want to run the validation functionality against",
        "name": "data"
      }
    ],
    "syntax": "simplyValid(options, data)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const simplyValid = require('simply_valid')"
      },
      "standard": {
        "title": "Standard",
        "code": "import simplyValid from 'simply_valid'"
      },
      "cdn": {
        "title": "CDN (Dev)",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/dist/simplyValid.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/simplyValid.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsMinMax",
    "examples": [
      "const minMax = meetsMinMax({\r  min: 0,\r  max: 10\r});\rconst result = minMax(5); // => true\r\r// OR\r\rconst result = meetsMinMax('11'); // => false\rconst result = meetsMinMax('eew2211'); // => true\rconst result = meetsMinMax('eerrt'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "Number"
          ]
        },
        "description": "The min value to compare to",
        "name": "$0.min"
      },
      {
        "type": {
          "names": [
            "Number"
          ]
        },
        "description": "The min value to compare to",
        "name": "$0.max"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsMinMax($0.min, $0.max, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsMinMax } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsMinMax } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsYearStandard",
    "examples": [
      "const result = meetsYearStandard('2017'); // => true\rconst result = meetsYearStandard('17'); // => true\rconst result = meetsYearStandard('178'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsYearStandard(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsYearStandard } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsYearStandard } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsCVN",
    "examples": [
      "const result = meetsCVN('201'); // => true\rconst result = meetsCVN('1777'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsCVN(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsCVN } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsCVN } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsCVNAmex",
    "examples": [
      "const result = meetsCVNAmex('201'); // => false\rconst result = meetsCVNAmex('1777'); // => true"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsCVNAmex(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsCVNAmex } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsCVNAmex } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsTreadDepth",
    "examples": [
      "const result = meetsTreadDepth('12'); // => true\rconst result = meetsTreadDepth('AA'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsTreadDepth(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsTreadDepth } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsTreadDepth } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "Meets",
    "title": "meetsPassReq",
    "examples": [
      "const pass = meetsPassReq('default');\rconst result = pass('cOol12$d'); // => true\r\r// OR\r\rconst result = meetsPassReq('default', 'cOol12$d'); // => true\rconst result = meetsPassReq('default')('cOol12$d') // => true\rconst result = meetsPassReq('default', 'AA'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "RegExp",
            "String"
          ]
        },
        "description": "Accepts a RegexExp or the 'default' string to use the default regex",
        "name": "pass"
      },
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "meetsPassReq(pass, val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { meetsPassReq } = require('simply_valid/meets')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { meetsPassReq } from 'simply_valid/meets'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/meets.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/meets/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "No",
    "title": "noSpecials",
    "examples": [
      "const result = noSpecials('AAAA'); // => true\rconst result = noSpecials('1122334') // => true\rconst result = noSpecials('AAA12!#$'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "noSpecials(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { noSpecials } = require('simply_valid/no')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { noSpecials } from 'simply_valid/no'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/no.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/no/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "No",
    "title": "noNumbers",
    "examples": [
      "const result = noNumbers('AAAA'); // => true\rconst result = noNumbers('1122334') // => false\rconst result = noNumbers('AAA12!#$'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "noNumbers(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { noNumbers } = require('simply_valid/no')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { noNumbers } from 'simply_valid/no'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/no.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/no/index.js\"></script>"
      }
    }
  },
  {
    "since": "v1.0.0",
    "category": "No",
    "title": "noLetters",
    "examples": [
      "const result = noLetters('1122334') // => true\rconst result = noLetters('AAAA'); // => false\rconst result = noLetters('AAA12!#$'); // => false"
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Boolean"
          ]
        },
        "description": "Returns true or false based on the validation test"
      }
    ],
    "params": [
      {
        "type": {
          "names": [
            "String"
          ]
        },
        "description": "The value to validate against",
        "name": "val"
      }
    ],
    "syntax": "noLetters(val)",
    "usage": {
      "commonjs": {
        "title": "CommonJs",
        "code": "const { noLetters } = require('simply_valid/no')"
      },
      "standard": {
        "title": "Standard",
        "code": "import { noLetters } from 'simply_valid/no'"
      },
      "cdn": {
        "title": "CDN",
        "code": "<script src=\"https://cdn.jsdelivr.net/npm/simply_valid@3.2.4/no.js\"></script>"
      },
      "browser": {
        "title": "Browser",
        "code": "<script src=\"path/to/simply_valid/no/index.js\"></script>"
      }
    }
  }
]