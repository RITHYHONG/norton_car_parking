# Norton Automatic Car Parking System

A modern web application for managing car parking operations built with Next.js 15, Firebase, and Tailwind CSS.

## Features

- 🚗 Real-time parking slot management
- 🔐 Secure authentication with Firebase
- 📊 Dashboard with analytics
- 📝 Car entry/exit logging
- 💳 Billing management
- 🌓 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** Firebase Auth
- **Database:** Firebase Realtime Database
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/norton_car_parking.git
cd norton_car_parking
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Firebase configuration:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/                # App router pages
├── components/         # Reusable components
├── lib/               # Libraries and configurations
├── utils/             # Utility functions
└── styles/            # Global styles
```

## Key Features Implementation

### Authentication
- Email/Password login
- Email link authentication
- Protected routes
- Session management

### Dashboard
- Real-time statistics
- Interactive parking slot visualization
- Quick access to key features

### Car Management
- Real-time slot availability
- Car entry/exit logging
- License plate image storage
- Parking duration tracking

### Reports
- CSV/PDF export functionality
- Custom date range filtering
- Advanced search capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Norton DCS Dept License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
