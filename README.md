# Music Album Catalog

This repository contains a web application built with React, TypeScript, Vite, Tailwind CSS, Zustand, and Supabase. The application is a music album catalog where users can view, search, filter, and manage music albums. It also includes authentication and role-based access control.

## Table of Contents

- [Features](#features)
  - [Authentication and Authorization](#1-authentication-and-authorization)
  - [Catalog Page](#2-catalog-page)
  - [Album Detail Page](#3-album-detail-page)
  - [Album Management (Editor Role)](#4-album-management-editor-role)
  - [Additional Features](#5-additional-features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Deployment](#deployment)
- [Responsiveness](#responsiveness)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### 1. Authentication and Authorization
- **User Roles**: Two roles are supported—Admin and Visitor.
- **Login and Registration**: Users can sign up and log in to access the application.
- **Email Confirmation**: During registration, users receive a confirmation email to verify their account, sent from custom domain.
- **Role-Based Access Control**: Admins can create, edit, and delete albums, while visitors can only view, filter and search.

### 2. Catalog Page
- **Paginated List**: Displays a list of music albums. You can extend this list and see more albums by click on "Load more"
- **Search and Filter**: Allows users to search for albums and filter the results based on specific criteria.
- **Album Detail Page**: Clicking on an album card navigates to a detailed page of the album.

### 3. Album Detail Page
- **Detailed Information**: Shows comprehensive details about the album, including title, artist, genre, release date, track count, cover image, description, and format.
- **Editor Functions**: Admins can delete or edit the album directly from this page.

### 4. Album Management (Editor Role)
- **Create Album**: Admins can add a new album to the catalog.
- **Edit Album**: Admins can update the details of existing albums.
- **Delete Album**: Admins can remove albums from the catalog.

### 5. Additional Features
- **Theme Toggle**: Supports switching between light and dark themes.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (handles authentication, database, and storage)
- **Deployment & Domain**: The application is deployed on Netlify using a custom domain, which also handles email confirmations for user registration.

## Database Schema

The database for the application is structured as follows:

- **Tables**:
  1. **albums**: Stores all music albums with details such as title, artist, genre, release date, track count, cover image, description, and format.
  2. **artists**: Contains information about artists or bands, referenced by the `albums` table.
  3. **formats**: Includes different album formats (e.g., CD, vinyl, digital) referenced by the `albums` table.
  4. **genres**: Contains various music genres that can be associated with albums.
  5. **roles**: Stores user roles, such as "Admin" and "Visitor."
  6. **user_roles**: Maps users to their respective roles, facilitating role-based access control.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/SKom2/muse-albums-catalog.git
    cd muse-albums-catalog
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Variables**:
   Create a `.env` file in the root of the project and add your Supabase credentials:
    ```bash
    VITE_SUPABASE_URL=https://yvomtbzsvhzwkgdaaegw.supabase.co    VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2b210Ynpzdmh6d2tnZGFhZWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMzIwNTMsImV4cCI6MjAzNjYwODA1M30.eBtKedHcq1jqvUDabAEpsmPr5iqiIFSkUXemBFLOgSQ
    ```

4. **Run the Application**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Build for Production**:
    ```bash
    npm run build
    # or
    yarn build
    ```

## Responsiveness
The application is fully responsive and designed to work on a variety of devices without horizontal scrolling.

**Note**: While the core functionality is implemented, the favorite albums catalog page is a planned enhancement and is currently not available.
