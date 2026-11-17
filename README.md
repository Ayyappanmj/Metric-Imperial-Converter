<div align="center">

# Metric-Imperial Converter API

**A robust, production-ready RESTful conversion service engineered with Node.js, Express, and Test-Driven Development (TDD).**

[![Node.js](https://img.shields.io/badge/Node.js-v16+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.17-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Mocha](https://img.shields.io/badge/Mocha-Testing-8D6748?style=for-the-badge&logo=mocha&logoColor=white)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/Chai-Assertions-A30701?style=for-the-badge&logo=chai&logoColor=white)](https://www.chaijs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## Executive Summary

The **Metric-Imperial Converter** is a full-stack REST API built to handle bi-directional conversions between international metric and imperial units of volume, mass, and distance. 

Architected with strict **Separation of Concerns (SoC)** and **Test-Driven Development (TDD)** principles, this project demonstrates real-world software engineering practices: resilient string tokenization, safe arithmetic parsing without insecure `eval()`, IEEE-754 floating-point precision stabilization, and granular error categorization.

---

## Architectural Highlights & Engineering Decisions

```
├── controllers/
│   └── convertHandler.js     # Core domain logic & mathematical transformations
├── routes/
│   ├── api.js                # REST route definitions & request lifecycle handling
│   └── fcctesting.js         # Test harness route hooks
├── tests/
│   ├── 1_unit-tests.js       # Domain logic verification (16 unit tests)
│   └── 2_functional-tests.js # End-to-end HTTP integration tests (5 tests)
├── views/
│   └── index.html            # Interactive client interface
├── server.js                 # Application entry point & middleware pipeline
```

### 1. Robust Input Tokenization & Defensive Parsing
Parsing user-supplied unit strings requires careful boundary detection. Instead of greedy regex matching that could risk ReDoS or miss edge cases:
- The parser identifies the boundary between numerical expressions and alphabetical unit identifiers using linear character scanning.
- Evaluates integer, float, single-fraction (`1/2`), and decimal-fraction (`5.4/3`) formats.
- Double fractions (`3/2/3`) and multi-slashed inputs are flagged and rejected immediately.
- Safely evaluates arithmetic ratios through explicit floating-point division without relying on JavaScript's unsafe `eval()`.

### 2. IEEE-754 Floating-Point Stabilization
JavaScript standard numbers are double-precision binary floats, which inherently produce rounding artifacts (e.g., `0.1 + 0.2 = 0.30000000000000004`).
- All conversions apply standard international conversion constants (`galToL = 3.78541`, `lbsToKg = 0.453592`, `miToKm = 1.60934`).
- Calculations are normalized to **5 decimal places** using standard fixed-precision parsing (`parseFloat(val.toFixed(5))`), ensuring mathematical accuracy across both forward and reciprocal conversions.

### 3. Standards-Compliant Unit Normalization
In accordance with international metrology standards (NIST / SI):
- All incoming units are treated case-insensitively (`GAL`, `gal`, `Gal`).
- Return units are standardized to lowercase, **except Liters (`L`)**, which retains the capitalized form to prevent visual ambiguity with the numeral `1`.

---

## Supported Conversions

| Dimension | Imperial Unit | Conversion Ratio | Metric Unit |
| :--- | :--- | :---: | :--- |
| **Volume** | Gallons (`gal`) | $1\text{ gal} = 3.78541\text{ L}$ | Liters (`L`) |
| **Mass** | Pounds (`lbs`) | $1\text{ lbs} = 0.453592\text{ kg}$ | Kilograms (`kg`) |
| **Distance** | Miles (`mi`) | $1\text{ mi} = 1.60934\text{ km}$ | Kilometers (`km`) |

---

## API Specification

### Endpoint: `GET /api/convert`

Accepts a single query parameter `input` containing the value and unit to convert.

#### Query Parameters

| Parameter | Type | Required | Description | Examples |
| :--- | :---: | :---: | :--- | :--- |
| `input` | `string` | **Yes** | Alphanumeric measurement string | `4gal`, `1/2km`, `5.4/3lbs`, `kg` |

---

### Response Scenarios

#### 1. Successful Conversion (`200 OK`)

**Request:**
```http
GET /api/convert?input=3.1mi HTTP/1.1
Host: localhost:3000
```

**Response Payload (`application/json`):**
```json
{
  "initNum": 3.1,
  "initUnit": "mi",
  "returnNum": 4.98895,
  "returnUnit": "km",
  "string": "3.1 miles converts to 4.98895 kilometers"
}
```

#### 2. Defaulting Value (`200 OK`)
When no numerical value is provided (e.g., `input=kg`), the engine defaults to `1`:
```json
{
  "initNum": 1,
  "initUnit": "kg",
  "returnNum": 2.20462,
  "returnUnit": "lbs",
  "string": "1 kilograms converts to 2.20462 pounds"
}
```

#### 3. Granular Error Handling (`200 OK`)
The API returns descriptive error responses distinguishing input failures:

| Failure Cause | Sample Input | Response Body |
| :--- | :--- | :--- |
| **Invalid Unit** | `/api/convert?input=32g` | `invalid unit` |
| **Invalid Number** | `/api/convert?input=3/7.2/4kg` | `invalid number` |
| **Invalid Number & Unit** | `/api/convert?input=3/7.2/4min` | `invalid number and unit` |

---

## Test-Driven Development & Verification

The project is backed by a 100% passing test suite combining isolated unit tests and end-to-end functional tests using **Mocha** and **Chai (TDD Interface)**.

```bash
$ npm test

  Unit Tests
    ✔ convertHandler should correctly read a whole number input.
    ✔ convertHandler should correctly read a decimal number input.
    ✔ convertHandler should correctly read a fractional input.
    ✔ convertHandler should correctly read a fractional input with a decimal.
    ✔ convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    ✔ convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    ✔ convertHandler should correctly read each valid input unit.
    ✔ convertHandler should correctly return an error for an invalid input unit.
    ✔ convertHandler should return the correct return unit for each valid input unit.
    ✔ convertHandler should correctly return the spelled-out string unit for each valid input unit.
    ✔ convertHandler should correctly convert gal to L.
    ✔ convertHandler should correctly convert L to gal.
    ✔ convertHandler should correctly convert mi to km.
    ✔ convertHandler should correctly convert km to mi.
    ✔ convertHandler should correctly convert lbs to kg.
    ✔ convertHandler should correctly convert kg to lbs.

  Functional Tests
    ✔ Convert a valid input such as 10L: GET request to /api/convert.
    ✔ Convert an invalid input such as 32g: GET request to /api/convert.
    ✔ Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
    ✔ Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    ✔ Convert with no number such as kg: GET request to /api/convert.

  21 passing (56ms)
```

---

## Getting Started

### Prerequisites
- **Node.js** $\ge$ 16.x
- **npm** $\ge$ 8.x

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayyappanmj/Metric-Imperial-Converter.git
   cd Metric-Imperial-Converter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp sample.env .env
   ```
   Set desired port and testing environment:
   ```env
   PORT=3000
   NODE_ENV=test
   ```

4. **Launch the service:**
   ```bash
   npm start
   ```
   Access the web interface or query the API at `http://localhost:3000`.

5. **Execute tests:**
   ```bash
   npm test
   ```

---

## Tech Stack

- **Backend Runtime:** Node.js
- **Web Framework:** Express.js
- **Test Framework & Assertion Library:** Mocha, Chai, Chai-HTTP
- **Middleware:** CORS, Body-Parser, Dotenv

---

## Author

**Ayyappan M J**  
- GitHub: [@Ayyappanmj](https://github.com/Ayyappanmj)  
- Email: ayyappanmadhuj@gmail.com

---

## License

This project is licensed under the [MIT License](LICENSE).
