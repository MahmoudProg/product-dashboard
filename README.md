# Product Dashboard
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Overview
This is an Angular-based Product Dashboard application that allows users to browse products, filter and sort them, manage favorites, and handle a shopping cart. The project is built with NgRx for state management, supports i18n (internationalization), and includes performance optimizations.

---

## Table of Contents
1. [Setup Instructions](#setup-instructions)  
2. [Architecture & State Management](#architecture--state-management)  
3. [i18n Setup & Performance Optimizations](#i18n-setup--performance-optimizations)  
4. [Possible Improvements](#possible-improvements)  

---

## Setup Instructions
Follow these steps to set up and run the project locally:

### 1. Prerequisites
Make sure you have installed the following:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Angular CLI (v15+)
```bash
npm install -g @angular/cli
npm install
```
### 2. Development server

To start a local development server, run:

```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
### 3. Running unit tests

To execute end-to-end tests with [Cypress](https://www.cypress.io), use the following command:

```bash
ng test
```

## Architecture & State Management

### Project Structure
product-dashboard/
│
├── src/
│ ├── app/
│ │ ├── core/ # Core module: singleton services, models, interceptors
│ │ │ ├── models/
│ │ │ ├── services/
│ │ │ └── interceptors/
│ │ │
│ │ ├── shared/ # Shared module: reusable components, pipes, directives
│ │ │ ├── components/
│ │ │ ├── directives/
│ │ │ └── pipes/
│ │ │
│ │ ├── features/
│ │ │ ├── products/
│ │ │ │ ├── components/
│ │ │ │ ├── state/ # NgRx store: actions, reducer, selectors, effects
│ │ │ │ └── pages/
│ │ │ │
│ │ │ ├── cart/
│ │ │ │ ├── state/ # NgRx store: actions, reducer, selectors, effects
│ │ │ │ └── cart.module.ts/
│ │ │ │
│ │ │ ├── favorites/
│ │ │ │ ├── state/ # NgRx store: actions, reducer, selectors, effects
│ │ │ │ └── favorites.module.ts/
│ │ │ │
│ │ │
│ │ ├── app-routing.module.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ ├── app.component.ts
│ │ └── app.module.ts
│ │
│ ├── assets/
│ ├── environments/
│ └── index.html
│
├── cypress/ # E2E tests
│ ├── e2e/
│ └── support/
│
├── angular.json
├── package.json
└── README.md
