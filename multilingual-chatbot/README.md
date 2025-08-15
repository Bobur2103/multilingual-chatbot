# Multilingual AI Chatbot

A modern, multilingual AI chatbot built with Next.js, TypeScript, and Hugging Face API. Supports English, Russian, and Uzbek languages with a comprehensive admin dashboard.

## Features

- 🤖 AI-powered conversations using Hugging Face models
- 🌍 Multilingual support (English, Russian, Uzbek)
- 📊 Admin dashboard with user analytics
- 🎨 Modern, responsive design
- 🔒 Secure API handling
- 📱 Mobile-friendly interface
- ⚡ Real-time chat experience

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI**: Hugging Face Inference API
- **Deployment**: Render, Docker support
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Hugging Face API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/multilingual-chatbot.git
cd multilingual-chatbot
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your Hugging Face API key:
\`\`\`
HUGGINGFACE_API_KEY=your_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Deploy to Render

1. Fork this repository
2. Connect your GitHub account to Render
3. Create a new Web Service
4. Set environment variables in Render dashboard
5. Deploy automatically on push to main branch

### Deploy with Docker

\`\`\`bash
# Build the image
docker build -t multilingual-chatbot .

# Run the container
docker run -p 3000:3000 -e HUGGINGFACE_API_KEY=your_key multilingual-chatbot
\`\`\`

## Configuration

### Environment Variables

- `HUGGINGFACE_API_KEY`: Your Hugging Face API key (required)
- `NEXT_PUBLIC_APP_URL`: Your app URL for production
- `NODE_ENV`: Environment (development/production)

### Supported Languages

- **English (en)**: Default language
- **Russian (ru)**: Русский язык  
- **Uzbek (uz)**: O'zbek tili

## API Endpoints

- `POST /api/chat`: Send message to AI and get response

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── chat-interface.tsx # Chat component
│   ├── admin-dashboard.tsx # Admin panel
│   └── language-provider.tsx # i18n provider
├── lib/                   # Utility libraries
│   └── huggingface-client.ts # AI client
├── scripts/               # Build scripts
└── public/               # Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using Next.js and Hugging Face AI
