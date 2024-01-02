# CVWO Assignment

## Getting Started

### Prerequisites

Ensure that the following are installed before following the installation guide.

#### Docker Desktop

Follow [this link](https://docs.docker.com/get-docker/) to install Docker Desktop.

### Local Setup

1. Clone the repo
    ```sh
    git clone https://github.com/GabrielCWT/CVWO.git
    ```
2. Create Docker containers
    ```sh
    docker compose up -d
    ```
3. Open [http://localhost:3000](http://localhost:3000) in the browser.

## Features

<ins>Not Logged-In Users</ins>

-   Account Creation:
    -   Users can create an account to access more platform features.
-   Post Viewing
    -   Users can browse paginated posts, seeing the post title and author. Upon clicking a post, they will be brought to that specific post’s page, showing its content and comments by other users.
-   Post Filtering by Category
    -   Users have the option to filter posts by different categories.

<ins>Logged-In Users</ins>

-   Commenting and Posting

-   Logged-in users can comment on or create posts in any chosen category.
    -   Automatic Login
-   Returning users will be automatically logged-in if their initial login was within the last 30 days.
    -   Post/Comment Management
-   The creator of the post/comment can edit and delete their own content.
