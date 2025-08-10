# 🐱 Cat Image Voting App

A React-based web application where users can browse random cat photos from TheCatAPI and vote on them. Built with React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- **Cat Gallery**: Browse random cat images in a responsive grid layout
- **Voting System**: Upvote (👍) or downvote (👎) on each cat image
- **Persistent Identity**: Your votes are tracked using a unique sub_id stored in localStorage
- **Real-time Scoring**: See vote counts update instantly after voting
- **My Votes Tab**: View all your previous votes with timestamps
- **Dark Mode**: Toggle between light and dark themes
- **Toast Notifications**: Get feedback on successful votes and error messages
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cat-image-voting
```

2. Install dependencies:
```bash
npm install
```

3. Set up your TheCatAPI key:
   - Visit [TheCatAPI](https://thecatapi.com/) and register for a free API key
   - Create a `.env` file in the root directory:
   ```env
   VITE_CAT_API_KEY=your_api_key_here
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API
- **State Management**: React Hooks
- **Linting**: ESLint

## 📱 API Endpoints Used

- `GET /images/search?limit=10` - Fetch random cat images
- `POST /votes` - Submit a vote (up/down)
- `GET /votes?sub_id={id}` - Fetch user's voting history

## 🎯 Core Requirements Met

- ✅ **Gallery**: Scrollable grid of cat images
- ✅ **Voting**: Up/Down buttons that disable after selection
- ✅ **Inline Score**: Real-time score updates
- ✅ **Persistent Identity**: localStorage-based sub_id
- ✅ **Refresh**: Button to fetch new images
- ✅ **Dark Mode**: Toggle with Tailwind dark class
- ✅ **My Votes**: Tab showing voting history
- ✅ **Toast Notifications**: Network error feedback

## 🎨 UI/UX Features

- Responsive grid layout that adapts to screen size
- Smooth hover animations and transitions
- Loading states with spinners
- Error handling with user-friendly messages
- Accessible button states and keyboard navigation
- Modern card-based design with shadows and rounded corners

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CAT_API_KEY` | Your TheCatAPI key | Yes |
