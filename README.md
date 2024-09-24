# Medium Blogging Website

A full-stack Medium-like blogging platform that allows users to upload, read, and interact with blogs in a seamless, user-friendly interface.


## Features
- **Dynamic and Responsive**: Built using **React**, **Tailwind CSS**, and **TypeScript** for a modern, clean, and responsive user interface.
- **Authentication & Authorization**: Implemented secure user authentication using **JSON Web Token (JWT)** with advanced validation through **Zod**.
- **Blog Management**: Users can effortlessly create, edit, and delete blogs, while also reading and interacting with others' content.
- **Data Integrity & Security**: Leveraged **Zod** for strong data validation, ensuring form input accuracy, and **JWT** for securing user sessions.
- **Database Integration**: Used **PostgreSQL** as the primary database, managed with **Prisma ORM** for smooth querying and data modeling.

## Tech Stack
- **Frontend**: 
  - TypeScript
  - React
  - Tailwind CSS
- **Backend**: 
  - NodeJS
  - Zod (Validation)
  - JSON Web Token (JWT)
- **Database**: 
  - PostgreSQL
  - Prisma ORM

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/medium-blogging-website.git

2. **Navigate to the project folder:**
   ```bash
   cd medium-blogging-website

3. **Install dependencies:**
   ```bash
   npm install

4. **Environment Variables Setup**
   Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev

6. **Start the development server:**
   ```bash
   npm run dev

   
## Usage

- Sign up or log in to your account.
- Create new blogs.
- Edit or delete your existing blogs.
- Browse blogs by other users.
- Engage with their content.
