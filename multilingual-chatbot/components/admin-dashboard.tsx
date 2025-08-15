"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Users, MessageSquare, Settings, Activity, TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  status: "online" | "offline"
  lastActive: Date
  messageCount: number
}

interface ChatSession {
  id: string
  userId: string
  userName: string
  startTime: Date
  messageCount: number
  language: string
}

export function AdminDashboard() {
  const { t } = useLanguage()
  const [apiKeyStatus, setApiKeyStatus] = useState<"checking" | "connected" | "error">("checking")
  const [apiKey, setApiKey] = useState("")

  // Check API key status on mount
  useEffect(() => {
    checkApiKeyStatus()
  }, [])

  const checkApiKeyStatus = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "test",
          language: "en",
        }),
      })

      if (response.ok) {
        setApiKeyStatus("connected")
      } else {
        setApiKeyStatus("error")
      }
    } catch (error) {
      setApiKeyStatus("error")
    }
  }

  // Mock data
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "online",
      lastActive: new Date(),
      messageCount: 45,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "offline",
      lastActive: new Date(Date.now() - 3600000),
      messageCount: 23,
    },
    {
      id: "3",
      name: "Алексей Петров",
      email: "alexey@example.com",
      status: "online",
      lastActive: new Date(),
      messageCount: 67,
    },
    {
      id: "4",
      name: "Aziz Karimov",
      email: "aziz@example.com",
      status: "offline",
      lastActive: new Date(Date.now() - 7200000),
      messageCount: 12,
    },
  ])

  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      startTime: new Date(Date.now() - 1800000),
      messageCount: 8,
      language: "en",
    },
    {
      id: "2",
      userId: "3",
      userName: "Алексей Петров",
      startTime: new Date(Date.now() - 3600000),
      messageCount: 15,
      language: "ru",
    },
  ])

  const stats = {
    totalUsers: users.length,
    onlineUsers: users.filter((u) => u.status === "online").length,
    totalMessages: users.reduce((sum, user) => sum + user.messageCount, 0),
    activeSessions: chatSessions.length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("admin.title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">{stats.onlineUsers} online now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSessions}</div>
            <p className="text-xs text-muted-foreground">Currently chatting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">All time messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Average response rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{t("admin.users")}</span>
            </CardTitle>
            <CardDescription>Manage and monitor user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.status === "online" ? "default" : "secondary"}>
                      {t(`user.${user.status}`)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{user.messageCount} msgs</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Chat Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Active Sessions</span>
            </CardTitle>
            <CardDescription>Currently active chat sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chatSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{session.userName}</p>
                      <p className="text-sm text-muted-foreground">{session.messageCount} messages</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{session.language.toUpperCase()}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {Math.floor((Date.now() - session.startTime.getTime()) / 60000)}m
                    </div>
                  </div>
                </div>
              ))}
              {chatSessions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No active sessions</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>{t("admin.settings")}</span>
          </CardTitle>
          <CardDescription>Configure bot settings and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-status">Hugging Face API Status</Label>
                <div className="flex items-center space-x-2">
                  {apiKeyStatus === "checking" && (
                    <>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Checking...</span>
                    </>
                  )}
                  {apiKeyStatus === "connected" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Connected</span>
                    </>
                  )}
                  {apiKeyStatus === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Not Connected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <span className="text-sm text-muted-foreground">HuggingFaceH4/zephyr-7b-beta</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-lang">Default Language</Label>
                <Badge variant="outline">English</Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-tokens">Max Response Tokens</Label>
                <span className="text-sm text-muted-foreground">150 tokens</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Hugging Face API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="hf_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button onClick={checkApiKeyStatus}>Test Connection</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Set HUGGINGFACE_API_KEY environment variable for production
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
