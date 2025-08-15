const fs = require("fs")

const envExample = `# Hugging Face API Configuration
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: For production deployment
NODE_ENV=production
`

fs.writeFileSync(".env.example", envExample)
console.log("Created .env.example file")
console.log("Please copy this to .env and add your actual API keys")
