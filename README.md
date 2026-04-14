# Playwright E2E Automation Framework

A complete end-to-end automation framework built with **Playwright** and **TypeScript**, covering the full e-commerce user journey.

---

## 1. Test Coverage

- **Login**
- **Products**
- **Cart**
- **Checkout Information**
- **Checkout Overview**
- **Order Completion**

---

## 2. Key Features

- 70+ automated end-to-end tests
- Page Object Model (POM) architecture
- Reusable fixtures for dependency injection
- Storage state authentication for fast, stable login
- Multi-user authentication (practice, test, student accounts)
- CI/CD ready with GitHub Actions
- Allure reporting with HTML report generation
- Clean, scalable folder structure for production use

---

## 3. Tech Stack

- **Playwright** (Chromium, Firefox, WebKit, Mobile Emulation)
- **TypeScript**
- Page Object Model (POM)
- Playwright Fixtures
- GitHub Actions (CI/CD)
- Allure Reports

---

## 4. Project Structure

---

├── pages
│ ├── base.page.ts
│ ├── login.page.ts
│ ├── products.page.ts
│ ├── cart.page.ts
│ ├── checkout-info.page.ts
│ ├── checkout-overview.page.ts
│ └── orderComplete.page.ts
│
├── tests
│ ├── fixtures
│ │ └── fixtures.ts
│ ├── setup
│ │ └── login.spec.ts
│ ├── products.spec.ts
│ ├── cart.spec.ts
│ ├── checkout.info.spec.ts
│ ├── checkout.overview.spec.ts
│ └── orderComplete.spec.ts
│
├── data
│ └── test-data.ts
│
└── playwright.config.ts

## 5. Highlights

- Designed using industry-standard automation practices
- Scalable for real-world production testing
- Easy to extend with new test scenarios and environments
- Supports cross-browser testing out of the box
