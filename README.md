# time_tracking_server

# Time Entries Management Backend

This Node.js backend provides an API for managing time entries. It uses Express for handling HTTP requests and MySQL as the database.

## Table of Contents

- [Setup](#setup)
- [Endpoints](#endpoints)
- [Usage](#usage)

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd time-tracking-server

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Database Configuration:**

   Set up your MySQL database and configure connection details in a .env file. You can use the .env.example file as a template.

4. **Run the Application:**

   ```bash
   npm start

   The server will run on http://localhost:8800 by default.
   ```

## Endpoints

1. GET /entries:
   Get all time entries.

2. GET /weekly-timesheet:
   Get a weekly timesheet for a specific user.

3. POST /entries:
   Create a new time entry.

4. PUT /entries/:id:
   Update a specific time entry by ID.

5. DELETE /entries/:id:
   Delete a specific time entry by ID.

## Usage

- Use the provided API endpoints to manage time entries.
- Customize the database configuration in the .env file.
- Additional details for each endpoint can be found in the code comments.
