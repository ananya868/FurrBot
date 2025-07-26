# FurrBot AI Frontend

A modern, minimalistic chat interface for the FurrBot AI API built with React and TypeScript.

## Features

- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 💬 **Real-time Chat**: Interactive chat interface with message history
- ⚙️ **Configurable**: Settings panel for LLM provider, model, and namespace
- 💾 **Persistent Storage**: Local storage for messages and configuration
- 🔄 **Auto-scroll**: Automatic scrolling to latest messages
- ⌨️ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- 🚀 **Loading States**: Visual feedback during API calls
- ❌ **Error Handling**: Graceful error handling and user feedback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running FurrBot AI backend (FastAPI server)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

The frontend will connect to the backend at `http://localhost:8000` by default. To change this:

1. Create a `.env` file in the frontend directory
2. Add: `REACT_APP_API_URL=http://your-backend-url:port`

## Usage

1. **Start Chatting**: Type your message and press Enter or click Send
2. **Configure Settings**: Click the settings icon to change LLM provider, model, or namespace
3. **Clear Chat**: Click the trash icon to clear all messages
4. **View History**: Your conversation history is automatically saved locally

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx    # Main chat component
│   ├── MessageBubble.tsx    # Individual message display
│   ├── MessageInput.tsx     # Message input form
│   └── Settings.tsx         # Configuration modal
├── services/
│   ├── api.ts              # API communication
│   └── storage.ts          # Local storage management
├── types/
│   └── index.ts            # TypeScript interfaces
└── App.tsx                 # Main app component
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Create React App** - Build tool

## API Integration

The frontend communicates with the FurrBot AI backend through these endpoints:

- `POST /ask` - Send a question and get a response
- `GET /health` - Check backend health status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 