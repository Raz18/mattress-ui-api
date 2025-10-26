# Awara Sleep QA Automation Test Suite

Automated testing framework for Awara Sleep e-commerce platform built with Playwright and TypeScript, implementing UI and API tests with Allure reporting and CI/CD integration.

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [CI/CD Integration](#cicd-integration)
- [Test Scenarios](#test-scenarios)

## 🛠 Technology Stack

- **Framework**: Playwright v1.56+
- **Language**: TypeScript v5.9+
- **Reporting**: Allure (allure-js-commons, allure-playwright, allure-commandline v2.34.1)
- **CI/CD**: GitHub Actions
- **Runtime**: Node.js 18+

## 📁 Project Structure

```
ui_js_task/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD configuration
├── pages/                          # Page Object Model
│   ├── BasePage.ts                 # Base page class
│   ├── HomePage.ts                 # Home page object
│   ├── MattressPage.ts             # Mattress page object
│   └── CartPage.ts                 # Cart page object
├── tests/
│   ├── ui/
│   │   └── mattress-purchase.spec.ts    # UI test suite
│   └── api/
│       └── products.spec.ts             # API test suite
├── utils/
│   └── logger.ts                   # Logging utility
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 📦 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ui_js_task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

## ▶️ Running Tests

### Run All Tests
```bash
npm test
```

### Run UI Tests Only
```bash
npm run test:ui
```

### Run API Tests Only
```bash
npm run test:api
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

### Debug Tests
```bash
npm run test:debug
```

## 📊 Test Reports

### Generate and View Allure Report
```bash
npm run report
```

This command will:
1. Generate the Allure report from test results
2. Automatically open the report in your default browser

### Generate Report Only
```bash
npm run report:generate
```

### Open Existing Report
```bash
npm run report:open
```

### Report Features
- ✅ Test execution timeline
- ✅ Test steps breakdown
- ✅ Screenshots for each step
- ✅ API request/response details
- ✅ Failure analysis
- ✅ Test history tracking

## 🔄 CI/CD Integration

GitHub Actions workflow runs on every push to any branch:

1. Installs dependencies and Playwright browsers
2. Executes all tests (UI + API)
3. Generates Allure reports
4. Uploads artifacts: Playwright HTML report, Allure results, screenshots, traces

Access reports via the **Actions** tab in your GitHub repository.

## 🧪 Test Scenarios

### UI Test: Mattress Purchase Flow
**Custom User-Agent**: `E2EUI-Tests`

1. Navigate to https://qa.awarasleep.com/ and verify page loads
2. Click "Shop Mattress" button, verify URL contains `/mattress`
3. Add mattress to cart using `data-testid="addtocart_btn"`
4. Verify automatic navigation to cart page (`/checkout/cart`)
5. Verify cart title shows "Your Cart (X Items)" format
6. Verify product appears in cart with correct title

### API Tests: Product Endpoints
**Base URL**: `https://qa-api.residenthome.com`

**Test 1**: Get Products by Brand
- **Endpoint**: `GET /products?brand=awara`
- **Validates**: Status 200, `result.data.length > 0`

**Test 2**: Get Specific Product
- **Endpoint**: `GET /products?name=the-awara-hybrid-mattress-30&lang=en&brand=awara`
- **Validates**: Status 200, `result.data.length = 1`

## 📝 Notes

- UI tests use custom User-Agent: `E2EUI-Tests`
- Page Object Model pattern for maintainable test architecture
- Allure reports organized with epic/feature labels
- Custom logger with timestamped INFO, WARN, ERROR, STEP levels
- Cart verification uses `data-testid` selectors for stability
