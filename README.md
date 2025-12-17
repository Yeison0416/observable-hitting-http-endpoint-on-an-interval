# HTTP Polling
This project demonstrates how to poll HTTP endpoints at a fixed interval using RxJS, while applying strong software architecture principles such as separation of concerns, SOLID-inspired design, and reactive state management — all without using a frontend framework.

The application allows users to:

* Select a data source (Cats or Meats)
* Start and stop HTTP polling
* Safely switch data sources while polling
* Render the latest response without stacking results

The primary purpose of this project is not UI complexity, but to showcase how data flows through an application, how polling is safely controlled, and how to structure frontend code in a production-ready way.

# Architecture & Software Design

1. **Architectural Style**
The project follows an MVC-inspired architecture, adapted for modern frontend development:

* Model
    * API layer
    * State management

* View
    * Handlebars templates (pure UI rendering)

* Controller
    * Orchestrator that wires UI events, state, and side effects
      
This keeps responsibilities clearly separated and makes the system easy to reason about and extend.

2. **Layered Structure**

   
   <img width="588" height="204" alt="image" src="https://github.com/user-attachments/assets/de72839e-ccf5-4a27-8014-587ef7640eda" />

* Each layer:
    * Has a single responsibility
    * Depends on abstractions, not implementations
    * Can evolve independently

3. **API Layer**

* Centralized HTTP client (httpGet<T>)
* Endpoint-specific services (getCats, getMeats, getDefaultState)
* Strong TypeScript typing for all responses

* This design allows:
    * Easy replacement of fetch with axios
    * Clear mocking strategies for tests
    * No coupling between UI and HTTP logic

4. **State Management**

- State is implemented using:
    * Pure functions
    * Factory functions
    * RxJS Observables and Subjects

- Examples:
      * selectionState$ → current API selection
      * pollingState() → polling lifecycle control
      * createDefaultState() → initial application data

- There is:
    * No global mutable state
    * No classes
    * No hidden side effects

State changes are explicit and predictable.

5. **Reactive Programming (RxJS)**

   RxJS is used to:
    * Control polling with timer
    * Switch HTTP requests with switchMap
    * Prevent duplicated polling with exhaustMap
    * Stop polling using takeUntil
    * Bind UI events with fromEvent

   This ensures:
    * Only one polling stream can exist at a time
    * Polling is safely canceled
    * Repeated user interactions do not break the app

6. **SOLID Principles Applied**
   Even without classes, the project applies SOLID concepts:

   * Single Responsibility
        * Each module does one thing (API, state, UI, orchestration)
    
   * Open / Closed
        * New endpoints or UI behaviors can be added without modifying core logic

   * Liskov Substitution
        * HTTP clients can be swapped as long as they follow the same contract

   * Interface Segregation
        * Small, focused types instead of large shared objects

   * Dependency Inversion
        * Controllers depend on abstractions (functions/contracts), not concrete implementations

# How the Project Works

1. The application loads a default UI state from an API
2. The controller renders the initial markup
3. DOM elements are selected and event streams are created
4. User actions trigger RxJS streams:
   * Start polling
    * Stop polling
    * Switch data source
5. Polling emits data at a fixed interval
6. The latest response replaces the previous one in the UI

At no point does the UI directly talk to the API or manage polling logic.

# Getting Started
**Install dependencies**

`npm install`

**Run the dev server**

`npm start`

This will start:

* Webpack Dev Server
* TypeScript type checking
* A mock API server using json-server

# Demo


