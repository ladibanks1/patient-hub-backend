# Patient-Hub

Patient Hub is a health app that connects patients with hospitals and doctors, providing a seamless experience for booking appointments, managing profiles, and real-time communication. Designed for ease of use, the app includes dedicated dashboards for patients, doctors, and hospitals, enabling efficient healthcare management.

# Features

- Patient Dashboard: Book and manage appointments, receive notifications, and give feedback.
- Doctor Dashboard: Manage schedules, update profiles, and track patient appointments.
- Hospital Dashboard: Oversee staff, respond to patient reviews, and manage hospital profiles.
- Real-Time Chat: Message directly between patients and healthcare providers.
- Notifications: Receive alerts on appointment status and reminders.

# Tech Stack
- Frontend: React, Redux, CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Real-Time Communication: Socket.io for chat and notifications

# Getting Started
  1. Clone the repository for the Backend:
     ```cmd
      git clone https://github.com/ladibanks/patient-hub-backend.git
      cd patient-hub
      ```
  2. Clone the repository for the Frontend:
       ```cmd
      git clone https://github.com/ladibanks/patient-hub-frontend.git
      cd patient-hub
      ```
  4. Install dependencies for both the Frontend And the Backend:
      ```cmd
      npm install
      ```
  4. Run the app for the Frontend:
       ```cmd
         npm run dev
       ```
  5. Run the app for the Backend:
       ```cmd
         npm start
       ```

# Folder Structure For The Backend
  - /config - Configuration for database and authentication
  - /services - Handle the database Queries
  - /routes - Handle all express Routing
  - /utils - contains resuable function
  - /model - Provides the database Schema
  - /controllers - handle request and response of the server
  - /middleware - The server middleware

# Contributing

 We welcome contributions! Please fork this repository and submit a pull request.

# License

This project is licensed under the MIT License.
