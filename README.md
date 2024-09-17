# YummyGreek Project

**YummyGreek** is a web application designed for a Greek restaurant to manage customer orders and reviews. It provides a seamless way for customers to browse the restaurant’s menu, customize their orders, and leave feedback—all from the convenience of their table. The app leverages Vue 3's Composition API, Pinia, TailwindCSS, and JSON-Server, ensuring a responsive and accessible user interface.

## Content

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Future Enhancements](#future-enhancements)

## Features

- **Browse Restaurant Menu**: Displays all available dishes with details including name, price, ingredients, allergens, and dietary preferences.
- **Filter and Sort**: Users can filter dishes based on dietary preferences (e.g., vegetarian, vegan), allergens, and price. Sorting options include alphabetical and price-based sorting.
- **Add/Remove Dishes to Cart**: Users can add or remove dishes from their cart, adjust quantities, and view the total price.
- **Order Confirmation**: Users can review and confirm their orders. Once confirmed, the order is processed.
- **Customer Feedback**: After finishing the meal, users can leave a review with a star rating and written feedback.
- **Responsive and Accessible**: The app is designed to be responsive across devices and incorporates accessibility features.

## Technologies Used

- **Vue 3 Composition API**: For managing the app’s state and component logic.
- **Vue Router**: For managing app navigation.
- **Pinia**: A state management library that simplifies handling global state.
- **TailwindCSS**: A utility-first CSS framework for creating responsive and modern designs.
- **JSON-Server**: Mock REST API used for development to simulate backend interactions.
- **Vite**: A fast development server and build tool optimized for modern web projects.
- **BEM (Block Element Modifier)**: A methodology for organizing and naming CSS classes to keep the styles modular and maintainable.

## Installation

Follow the steps below to set up the project locally:

#### 1. Clone the repository:

```sh
git clone https://github.com/dkarakop/yummy-greek.git
```

#### 2. Navigate to the project directory:

```sh
cd yummy-greek
```

#### 3. Install the required dependencies:

```sh
npm install
```

#### 4. Run the application

Backend:

```sh
json-server --watch db.json
```

> [!NOTE]
> To change the default backend URL, edit the `apiUrl` variable in the _modules/api.js_

Frontend:

```sh
npm run dev
```

## Future Enhancements

- Backend Integration: Integrate the app with a backend system for handling real-time orders and reviews.
