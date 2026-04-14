🧪 Playwright E2E Automation Framework — QA Brains E‑Commerce
A complete end‑to‑end automation framework built with Playwright + TypeScript, covering the full e‑commerce flow:

Login

Products

Cart

Checkout Info

Checkout Overview

Order Complete

✔ 75+ Tests Passing
✔ Page Object Model
✔ Fixtures for dependency injection
✔ Multi‑user authentication (practice, test, student)
✔ CI/CD ready
✔ Allure reporting support
🚀 Tech Stack
Playwright (Chromium, Firefox, WebKit)

TypeScript

Page Object Model (POM)

Fixtures

GitHub Actions CI/CD

Allure Reports

pages/
base.page.ts
login.page.ts
products.page.ts
cart.page.ts
checkout-info.page.ts
checkout-overview.page.ts
orderComplete.page.ts

tests/
fixtures/
fixtures.ts
setup/
login.spec.ts
products.spec.ts
cart.spec.ts
checkout.info.spec.ts
checkout.overview.spec.ts
orderComplete.spec.ts

data/
test-data.ts

playwright.config.ts
