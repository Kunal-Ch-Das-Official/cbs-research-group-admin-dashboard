# CBS Research Group Admin Portal

## Overview

The CBS Research Group Backend is a RESTful API designed to manage the operations of the CBS Research Group. Built with Node.js and Express.js, it leverages MongoDB for data storage and supports various functionalities, including user authentication, CRUD operations, and automated email services.

## Table of Contents

-   [Project Information](#project-information)
-   [Technology Stack](#technology-stack)
-   [Architecture](#architecture)
-   [Features](#features)
-   [Routes](#routes)
-   [Base URLs](#base-urls)
-   [Setup and Installation](#setup-and-installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Project Information

-   **Project Name:** CBS Research Group Admin Portal
-   **Owner:** Dr. Chinmoy Bhattachary
-   **Organization:** CBS Research Group
-   **About Organization:** CBS Research Group is a chemistry research lab under the Indian Institute of Engineering Science and Technology (IIEST, Shibpur), with a rich history spanning over 160 years.
-   **Address:** Botanic Garden, Dist: Howrah, West Bengal, India - 711103
-   **Contact:** +91 (033) 2668 4561 to 63 | +91 (033) 2668 2916 (Fax)
-   **Author:** Kunal Chandra Das
-   **Position:** Web Developer

## Technology Stack

-   **Frontend Framework:** React.js
-   **Language:** JavaScript

## Architecture

The admin portal follows a modular architecture, ensuring separation of concerns and scalability.

## Features

-   **CRUD Operations:** Manage data for various entities such as alumni, members, projects, and more.
-   **Authentication:** Secure login and registration for admin users.
-   **Automatic Email Service:** Send emails for registration, password reset, and contact responses.
-   **Data Caching:** Automatically caches data after the first request.
-   **And many more.**

## Routes

-   **Base URL:**

```bash
https://adminsconsole.chinmoybhattacharyaelectrochemistry.com
```

## Setup and Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Kunal-Ch-Das-Official/cbs-research-group.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd cbs-research-group-backend
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Set Up Environment Variables:**
   Create a `.env` file and configure the necessary environment variables (e.g., MongoDB URI, Cloudinary API keys, etc.).

5. **Run the Server in Development:**

    ```bash
    npm run dev
    ```

6. **Run the Server in Production:**

    ```bash
    npm start
    ```

## Usage

-   Use tools like Postman to interact with the API endpoints.
-   Implement the routes according to the base URLs and endpoints provided.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
