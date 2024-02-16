# Musiversal Challenge

## 🚀 Setup Instructions

For testing purposes, the seeded database file `musiversal_development.sqlite` and the `.env` are being tracked

**0. Prerequisites**

Ensure you have Node.js version 16 or higher installed.

**1. Clone the repository**

```
git clone <repository-url>
```

**2. Install dependencies**

```
npm install
```

**3. Start the development server**
For the backend app:

```
npx nx serve server
```

For the frontend app:

```
npx nx serve client
```

**4. Run unit tests**

```
npx nx test server
```

## 📊 Entity Relation Diagram

You can view the Entity Relation Diagram for this project by following [this link](https://drive.google.com/file/d/1Jkw2s1Fecg8g647txSV-UFH7FxsrDWNF/view?usp=sharing)

## 💡 Technical Choices

- **Nx Monorepo** for its streamlined monorepo management, facilitating efficient code sharing and scalable architecture

- **Typescript** enhancing code reliability and developer productivity

- **Sqlite** as suggested for simplicity and ease of setup for development purposes

- **Jest** for tests. Popular and easy to setup

## 📚 Open Source Libraries

- **Material UI** easy-to-customize components, making my UI development faster and keeping the design consistent

- **Date fns** date manipulation, enabling precise and easy handling of dates and times in the application

- **Url Join** and **Path to Regexp** ensuring reliable and
  error-free URL construction

- **Yup** for schema validation, enhancing form validation processes

- **Sequelize** as described in the job description

- **Formik** to streamline form handling, simplifying form state management, validation, and submission

- **Axios and React Query**: For efficient data fetching and state management

- **ESLint and Prettier**: Included by default on nx workspace creation. Enforces a consistent code style across the project

## 🌟 Additional Features

- Custom 404 page
- Form validation
- Keyboard navigation
- List all musician services
- Smooth loading experience
- Improved UX: Booking success message closes when user selects a different musician
- Responsive design: [Mobile View](https://ihack-cloud.s3.eu-west-3.amazonaws.com/mobile-view.png), [Tablet View](https://ihack-cloud.s3.eu-west-3.amazonaws.com/tablet-view.png)

## 🐛Known Bugs

- Usage of `sequelize.sync()`: To quickly set up the database schema for testing. In a production environment, it's generally recommended to manage database schema changes using migrations instead
- For the purposes of this coding challenge, I've included both the `.env` and `.sqlite` files in the repository to simplify setup and testing. This allows anyone evaluating the challenge to easily run the application without needing to configure the environment or set up the database.

## 🔮 Future Enhancements

- Improved error handling and complete test coverage
- Frontend testing
- Implementation of authentication mechanisms
- Localization support to cater to different languages
- Dark mode with MUI
- Enhanced error feedback for client-side operations
- User-friendly URLs incorporating musician names instead of numeric IDs
- Search/filter engine
- Optimize Musicians view for mobile responsiveness

## 🚧 Challenges

- Initial database setup and configuration of tests
