"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LanguageProvider } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings } from "lucide-react"

export default function Home() {
  const [currentView, setCurrentView] = useState<"chat" | "admin">("chat")

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-foreground">AI Chatbot</h1>
                <div className="flex space-x-2">
                  <Button
                    variant={currentView === "chat" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView("chat")}
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Button>
                  <Button
                    variant={currentView === "admin" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView("admin")}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {currentView === "chat" ? <ChatInterface /> : <AdminDashboard />}
        </main>
      </div>
    </LanguageProvider>
  )
}
