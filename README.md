# Playwright E2E Automation Framework

A complete end-to-end automation framework built with **Playwright** and **TypeScript**, covering the full e-commerce journey:

## 🚀 Test Coverage

- Login  
- Products  
- Cart  
- Checkout Information  
- Checkout Overview  
- Order Completion  

---

## ✨ Key Features

- ✅ 75+ automated end-to-end tests  
- 🧱 Page Object Model (POM) architecture  
- ♻️ Reusable fixtures for dependency injection  
- 👥 Multi-user authentication (practice, test, student accounts)  
- ⚙️ CI/CD ready with GitHub Actions  
- 📊 Allure reporting with HTML report generation  
- 📁 Clean, scalable folder structure for production use  

---

## 🛠 Tech Stack

- Playwright (Chromium, Firefox, WebKit)  
- TypeScript  
- Page Object Model (POM)  
- Playwright Fixtures  
- GitHub Actions (CI/CD)  
- Allure Reports  

---

## 📂 Project Structure

.
├── pages
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── products.page.ts
│   ├── cart.page.ts
│   ├── checkout-info.page.ts
│   ├── checkout-overview.page.ts
│   └── orderComplete.page.ts
├── tests
│   ├── fixtures
│   │   └── fixtures.ts
│   ├── setup
│   │   └── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.info.spec.ts
│   ├── checkout.overview.spec.ts
│   └── orderComplete.spec.ts
├── data
│   └── test-data.ts
└── playwright.config.ts

│
├── data
│   └── test-data.ts
│
└── playwright.config.ts
