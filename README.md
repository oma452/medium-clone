# Medium Clone

A full-stack blogging platform inspired by Medium, built with modern web technologies. This application provides a clean, intuitive interface for creating and sharing long-form content with features like user authentication, profile management, post categorization, and social interactions.

## Features

- **User Authentication** - Secure registration and login system with Laravel Breeze
- **Post Management** - Create, edit, and delete articles with rich media support
- **Categories & Tags** - Organize content with customizable categories
- **Social Interactions** - Follow users and clap (like) posts
- **User Profiles** - Personalized profiles with bio and follower statistics
- **Responsive Design** - Mobile-first UI built with Tailwind CSS
- **Media Library** - Upload and manage images using Spatie Media Library
- **SEO-Friendly URLs** - Automatic slug generation for posts and profiles
- **Docker Support** - Fully containerized development environment

## Tech Stack

**Backend:**
- PHP 8.2
- Laravel 12
- MySQL 8.0
- Inertia.js

**Frontend:**
- React 19
- Tailwind CSS
- Alpine.js
- Vite

**Development:**
- Docker & Docker Compose
- Pest (Testing)
- Scribe (API Documentation)
- Laravel Pint (Code Style)

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/oma452/medium-clone.git
cd medium-clone
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Build and start the Docker containers:
```bash
docker-compose up -d
```

4. Install dependencies and setup the application:
```bash
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --seed
```

5. Install frontend dependencies:
```bash
npm install
npm run build
```

6. Access the application at `http://localhost:8080`

### Manual Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/oma452/medium-clone.git
cd medium-clone
composer install
npm install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Update `.env` with your database credentials and run migrations:
```bash
php artisan migrate --seed
```

4. Build assets and start the development server:
```bash
npm run dev
php artisan serve
```

## Usage

### Creating Posts
1. Register or login to your account
2. Navigate to "Create Post"
3. Add your title, content, and select a category
4. Upload a cover image (optional)
5. Publish your post

### Following Users
Visit any user's profile and click "Follow" to see their posts in your feed.

### Interacting with Posts
- **Clap** - Show appreciation by clapping for posts (similar to likes)
- **Share** - Share posts with your network
- **Comment** - Engage with authors and readers

## API Documentation

API documentation is available via Scribe. Generate the docs with:
```bash
php artisan scribe:generate
```
Access at `/docs` after generation.

## Testing

Run the test suite:
```bash
php artisan test
```

Or using Pest directly:
```bash
./vendor/bin/pest
```

## Future Improvements

- Comments system for post discussions
- Bookmarking and reading lists
- Draft auto-save functionality
- Email notifications for followers
- Advanced search with filters
- Reading time estimation
- Social media sharing integration
- Dark mode support

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
