'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User } from 'lucide-react'
import type { Message, GPTConfig } from '../types/gpt'

interface ChatInterfaceProps {
  onConfigUpdate: (config: GPTConfig) => void;
}

export function ChatInterface({ onConfigUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hola! Soy tu asistente para crear un GPT personalizado. Cuéntame, ¿qué tipo de GPT te gustaría crear?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = {
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage]
        }),
      })

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // If the response is not JSON, treat it as text
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Unexpected response: ${text}`);
      }

      if (!response.ok) {
        console.error('Response not OK:', response.status, data);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data || typeof data !== 'object') {
        console.error('Invalid data:', data);
        throw new Error('Invalid response data');
      }

      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        console.error('No message in response:', data);
        throw new Error('No message in response');
      }
      
      if (data.config) {
        onConfigUpdate(data.config);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Lo siento, ha ocurrido un error: ${error instanceof Error ? error.message : 'Error desconocido'}`
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message, i) => (
          <Card key={i} className={`p-4 max-w-[80%] ${message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto'}`}>
            <div className="flex items-start gap-3">
              {message.role === 'assistant' ? (
                <Bot className="w-5 h-5 mt-1" />
              ) : (
                <User className="w-5 h-5 mt-1" />
              )}
              <p className="leading-relaxed">{message.content}</p>
            </div>
          </Card>
        ))}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1"
          rows={1}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}

