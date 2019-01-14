# Installation

This project is built on [create-react-app](https://github.com/facebook/create-react-app). To install dependencies run `yarn install` in the root and to start the project run `yarn start`

# Technical choices

- create-react-app is used because it is the simplest way to scaffold a React project the has no server-side rendering requirement.
- react-router was chosen for routing as it is the most feature rich and easiest to use which makes it a very popular choice in the comunity.
- To handle page transitions I use react-transition-group because it is simple to use and can be used in a variety of contexts.
- Pre-commit hooks are used for code quality control.
- eslint and prettier are used to maintain code consistency.
- jest and enzyme are used for automated tests as they are the suggested tools when using create-react-app.
- I spend no time on styling as there was no design to follow and I didn't think it important for this project

# Instructions: Frontend Challenge vo2

### **Some notes**

_Please make a new repository on GitHub for this project - we'd love to see your commit messages!_
_You can use the technology of your choice, as long the result is a React._
_If you have any questions about the task, email Moritz at moritz@home.ht. Happy to help ;-)_

### **The Challenge** 💪

Home rents to a select group of tenants. The aim of this challenge is to build an application form for tenants, so that they can register with Home and start booking apartments.

We're looking for a multi-page application form, which should include:

- fields, including:
  - full name
  - email
  - phone number
  - salary indication (radio buttons)
    - 0 - 1.000
    - 1.000 - 2.000
    - 2.000 - 3.000
    - 3.000 - 4.000
    - Mehr als 4.000
- a progress indicator
- a summary of all the data entered during the flow, displayed on the last page.

Stretch goals to show off 😎:

- Animations
- Responsive design
- Automated tests

### **When you're done** ✅

Send Mia (mia@home.ht) an email with the following:

- a link to your repo on GitHub
- a short summary of technical choices, the decisions you made and what could be improved.
- Finally, please include a short Readme to help us launch and test the project.

Thank you and excited to see the results! 🚀
