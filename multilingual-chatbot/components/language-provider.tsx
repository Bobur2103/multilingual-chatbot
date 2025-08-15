"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "ru" | "uz"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "chat.title": "AI Assistant",
    "chat.placeholder": "Type your message...",
    "chat.send": "Send",
    "admin.title": "Admin Dashboard",
    "admin.users": "Users",
    "admin.messages": "Messages",
    "admin.settings": "Settings",
    "language.select": "Select Language",
    "user.online": "Online",
    "user.offline": "Offline",
    "message.typing": "AI is typing...",
  },
  ru: {
    "chat.title": "ИИ Ассистент",
    "chat.placeholder": "Введите ваше сообщение...",
    "chat.send": "Отправить",
    "admin.title": "Панель Администратора",
    "admin.users": "Пользователи",
    "admin.messages": "Сообщения",
    "admin.settings": "Настройки",
    "language.select": "Выберите язык",
    "user.online": "Онлайн",
    "user.offline": "Оффлайн",
    "message.typing": "ИИ печатает...",
  },
  uz: {
    "chat.title": "AI Yordamchi",
    "chat.placeholder": "Xabaringizni kiriting...",
    "chat.send": "Yuborish",
    "admin.title": "Admin Paneli",
    "admin.users": "Foydalanuvchilar",
    "admin.messages": "Xabarlar",
    "admin.settings": "Sozlamalar",
    "language.select": "Tilni tanlang",
    "user.online": "Onlayn",
    "user.offline": "Oflayn",
    "message.typing": "AI yozmoqda...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
