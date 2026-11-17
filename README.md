# Metric-Imperial Converter

A full-stack JavaScript application built with Node.js, Express, and Mocha/Chai that converts measurements between Metric and Imperial units. Created as part of the **freeCodeCamp Quality Assurance Certification**.

---

## Features

- **Bidirectional Unit Conversion**:
  - Gallons (`gal`) $\leftrightarrow$ Liters (`L`)
  - Miles (`mi`) $\leftrightarrow$ Kilometers (`km`)
  - Pounds (`lbs`) $\leftrightarrow$ Kilograms (`kg`)
- **Flexible Number Input**: Supports whole numbers, decimals, fractions (e.g. `1/2`), and fractional decimals (e.g. `5.4/3`). Defaults to `1` when no numerical input is provided.
- **Robust Input Validation & Error Handling**:
  - Handles invalid units (`invalid unit`)
  - Handles invalid numbers and double fractions (`invalid number`)
  - Handles simultaneously invalid numbers and units (`invalid number and unit`)
- **Automated Testing Suite**:
  - 16 unit tests covering parsing, validation, and math precision.
  - 5 functional tests validating HTTP endpoints and status codes.

---

## API Endpoints

### `GET /api/convert?input={value}`

#### Example Requests

- `/api/convert?input=4gal`
- `/api/convert?input=1/2km`
- `/api/convert?input=5.4/3lbs`
- `/api/convert?input=kg`

#### Example Response (Valid)

```json
{
  "initNum": 3.1,
  "initUnit": "mi",
  "returnNum": 4.98895,
  "returnUnit": "km",
  "string": "3.1 miles converts to 4.98895 kilometers"
}
```

#### Example Response (Invalid Input)

- `/api/convert?input=32g` $\rightarrow$ `invalid unit`
- `/api/convert?input=3/7.2/4kg` $\rightarrow$ `invalid number`
- `/api/convert?input=3/7.2/4kilomegagram` $\rightarrow$ `invalid number and unit`

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd boilerplate-project-metricimpconverter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment configuration:
   ```bash
   cp sample.env .env
   ```
   Set `PORT=3000` and `NODE_ENV=test` in `.env`.

4. Start the application:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

---

## Running Tests

To run the unit and functional test suites in the console:

```bash
npm test
```

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Testing**: Mocha & Chai (Chai-HTTP)
- **Frontend**: HTML5, CSS3, jQuery

---

## License

This project is licensed under the MIT License.
