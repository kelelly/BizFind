# BizFind - Local Business Directory

## Project Overview

BizFind is a local business directory software system aimed at providing users with a comprehensive platform to discover and engage with businesses in their area. It enables businesses to showcase and manage their profiles, increasing their customer base through online visibility. The web-based software offers features such as business listings, reviews, ratings, search functionalities, and integration with maps/navigation services.

## Objectives

1. **Promote Local Businesses:** Increase visibility and competitiveness of local grocery stores, supermarkets, and general shops.
2. **Enhance Consumer Convenience:** Provide a user-friendly interface accessible via web and mobile platforms.
3. **Provide Accurate and Up-to-Date Information:** Maintain a comprehensive, regularly updated database of local businesses.
4. **Foster Community Engagement:** Enable consumers to leave reviews and feedback, fostering trust and community support.
5. **Support Informed Decision-Making:** Implement advanced search filters to help consumers find businesses based on location, services, and ratings.

## Features

1. **Business Location and Directions:** Locate businesses on the map and get directions.
2. **Customer Reviews:** Provide feedback and ratings for businesses.
3. **Products and Services Listings:** Showcase business offerings with detailed descriptions and images.
4. **Secure Business Registration and Login:** Allow businesses to register and manage their profiles securely.
5. **Contact Details:** Display business contact information, including phone numbers, email addresses, and social media links.
6. **Operating Hours:** View hours of operation for each business.
7. **Advanced Search Functionalities:** Search for businesses based on location, services, ratings, and operating hours.
8. **Business Category Selection:** Ensure accurate categorization during the registration process.
9. **Product Listings Accessible on Landing Page:** Display product listings prominently for easy access.
10. **Login and Registration Options on Landing Page:** Allow users to log in or register directly from the landing page.

## Dependencies

### Backend Dependencies

- Node.js
- Express.js
- Mongoose (for MongoDB)
- Here Maps API
- dotenv
- passport
- passport-local
- bcryptjs
- body-parser
- cors

### Frontend Dependencies

- Vue.js
- Nuxt.js
- Axios
- Vuex

### Common Tools

- Git
- MongoDB
- Google Analytics
- HTTPS encryption

## Getting Started

### Installation Process

#### Backend Setup

1. **Initialize Node.js project**

    ```bash
    mkdir server
    cd server
    npm init -y
    ```

2. **Install dependencies**

    ```bash
    npm install express mongoose dotenv passport passport-local bcryptjs body-parser cors
    ```

3. **Create project structure**

    ```bash
    mkdir controllers models routes middlewares utils
    touch app.js
    ```

4. **Create a `.env` file** in the `server` directory with the following content:

    ```bash
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

5. **Run the server**

    ```bash
    node app.js
    ```

#### Frontend Setup

1. **Create a new Nuxt.js project**

    ```bash
    npx create-nuxt-app client
    ```

2. **Navigate to the project directory**

    ```bash
    cd client
    ```

3. **Install additional dependencies**

    ```bash
    npm install axios vuex
    ```

4. **Run the frontend**

    ```bash
    npm run dev
    ```

### Software Dependencies

- **Backend:** Node.js, Express.js, MongoDB, Passport.js, dotenv, bcryptjs, body-parser, cors
- **Frontend:** Vue.js, Nuxt.js, Axios, Vuex

### API References

- **Authentication:** `/api/auth`
- **Business Listings:** `/api/business`
- **Reviews:** `/api/reviews`
- **Maps Integration:** `/api/maps`

### Latest Releases

Check the [releases page](https://dev.azure.com/bizzareempire/bizfind/_release) for the latest version.

## Build and Test

### Building the Project

#### Backend

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Start the server**

    ```bash
    npm start
    ```

#### Frontend

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Build the project**

    ```bash
    npm run build
    ```

### Running Tests

#### Backend Tests

1. **Install testing dependencies**

    ```bash
    npm install --save-dev mocha chai supertest
    ```

2. **Run tests**

    ```bash
    npm test
    ```

#### Frontend Tests

1. **Install testing dependencies**

    ```bash
    npm install --save-dev jest vue-test-utils
    ```

2. **Run tests**

    ```bash
    npm run test
    ```

## Contribute

Contributions are welcome to make BizFind better. Here’s how you can contribute:

1. **Fork the repository** on Azure DevOps.
2. **Clone your fork** to your local machine.

    ```bash
    git clone https://dev.azure.com/bizzareempire/bizfind/_git/bizfind
    ```

3. **Create a new branch** for your feature or bugfix.

    ```bash
    git checkout -b feature-name
    ```

4. **Make your changes** and commit them.

    ```bash
    git commit -m "Description of changes"
    ```

5. **Push to your branch**.

    ```bash
    git push origin feature-name
    ```

6. **Create a Pull Request** on Azure DevOps.

For detailed contribution guidelines, refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

If you want to learn more about creating good readme files, refer to the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
nextjs-writers-hub/
