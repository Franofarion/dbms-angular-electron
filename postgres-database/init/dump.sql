-- Create a table for users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert mock data into the users table
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('Dana White', 'dana@example.com'),
('Eve Black', 'eve@example.com');

-- Insert mock data into the posts table
INSERT INTO posts (user_id, title, body) VALUES
(1, 'The Art of Baking', 'A blog post about baking bread at home.'),
(2, 'Top 10 Coding Tips', 'A list of top 10 tips for beginner programmers.'),
(3, 'Traveling the World', 'Charlie shares his experience of traveling to 10 countries.'),
(1, 'Vegan Recipes', 'Healthy and delicious vegan recipes to try at home.'),
(4, 'Fitness Journey', 'Dana shares her fitness journey and tips for staying motivated.');

-- Insert mock data into the comments table
INSERT INTO comments (post_id, user_id, comment) VALUES
(1, 2, 'Great post! I love baking too.'),
(1, 3, 'This inspired me to try baking bread for the first time.'),
(2, 1, 'Thanks for the tips, very helpful!'),
(3, 4, 'Traveling is amazing, I hope to do the same soon.'),
(4, 5, 'I love vegan food! These recipes look great.'),
(5, 3, 'Thanks for the motivation, Dana!');

-- Create indexes to optimize queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);

-- Foreign key constraints are defined in the table creation, ensuring:
-- - Deleting a user will delete their posts and comments (ON DELETE CASCADE).
-- - Deleting a post will delete its associated comments (ON DELETE CASCADE).
