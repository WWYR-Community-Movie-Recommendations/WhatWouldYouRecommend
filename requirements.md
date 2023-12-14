# Software Requirements for WWYR? (What Would You Recommend?) Project

## Vision

The vision of WWYR? is to provide users with personalized and trustworthy movie recommendations from their own community. The application aims to solve the pain point of users feeling overwhelmed by impersonal algorithm-based movie suggestions. By offering a community-driven platform, users can discover movies recommended by people they know and trust, making the movie selection process more enjoyable and meaningful.  

## Scope (In/Out)  

**IN - What will your product do:**

  1. Provide a recommendation submission form where users can easily input their favorite movie recommendations, along with comments, their contributor details (identifying themselves), and a YouTube trailer link.

  2. Generate a randomly selected movie recommendation for users based on the user-submitted list, complete with a YouTube trailer, contributor details, and comments.

  3. Create a dedicated data page showcasing a well-organized list of all movie recommendations submitted by users, displaying titles, YouTube trailers, contributor names, and comments.

  4. Consider potential enhancements for the application, such as adding a rating system for movies, allowing users to add personal notes to watched movies, and creating recommendation playlists.  

  5. Query AI for movie recommendations based on the movie user has selected.

**OUT - What will your product not do:**

It will not support the ability to watch full movies within the app, as it is focused on providing movie information and trailers.  

**Minimum Viable Product (MVP) vs Stretch Goals:**

**MVP Functionality:**  

1. Recommendation submission form for users to input movie recommendations, comments, contributor details, and YouTube trailer links.
2. Random movie recommendation generator from the user-submitted list, including YouTube trailer, contributor details, and comments.
3. Dedicated data page presenting an organized list of user-submitted movie recommendations, showing titles, YouTube trailers, contributor names, and comments.
4. Query AI for movie recommendations.
5. Ability to login and logout with authentication via Auth0, cannot access application without authentication.
6. CRUD - User can Create, Read, Update, and Delete movies.

**Stretch Goals:**  

1. Implement a rating system, allowing users to rate the movies they have watched.
2. Enable users to create and manage recommendation playlists, grouping movie suggestions based on themes or genres.
3. Mark movies as watched by user.
4. Create separate groups for different groups of friends and family.

## Functional Requirements

1. Users can access the recommendation submission form and input movie details, comments, contributor information, and YouTube trailer links.
2. The application should generate random movie recommendation for users, displaying the movie title, YouTube trailer, contributor details, and comments.
3. Users can explore the complete list of movie recommendations through the dedicated data page.
4. User ability to share movies.
5. User can query AI for movie recommendations.
6. CRUD - User can Create, Read, Update, and Delete movies.

**Data Flow:**

1. User logs in via authentication.
2. User is presented with random movies.
3. User clicks share movie button and accesses the 'share a movie' form.
4. User inputs their favorite movie recommendation, comments and YouTube trailer link.
5. Submitted data is processed and saved to the database.
6. The selected movie details, including the YouTube trailer, contributor information, and comments, are presented to the user.
7. Users can explore all movie recommendations through the dedicated data page, which displays the organized list of titles, YouTube trailers, contributor names, and comments.
8. User can update and delete their own movies shared by themselves in community list page.
