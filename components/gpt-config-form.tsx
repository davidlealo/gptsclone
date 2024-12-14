'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from './chat-interface'
import type { GPTConfig } from '../types/gpt'

export function GPTConfigForm() {
  const [activeTab, setActiveTab] = useState('form')
  const [config, setConfig] = useState<GPTConfig>({
    name: '',
    description: '',
    instructions: '',
    context: '',
    model: 'gpt-3.5-turbo'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí implementaremos la lógica de guardado
    console.log('Configuración:', config)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Personaliza tu GPT</CardTitle>
        <CardDescription>
          Configura tu GPT personalizado usando el formulario o chateando
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Formulario</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Mi GPT Personalizado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  placeholder="Describe qué hace tu GPT"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instrucciones</Label>
                <Textarea
                  id="instructions"
                  value={config.instructions}
                  onChange={(e) => setConfig({ ...config, instructions: e.target.value })}
                  placeholder="Define cómo debe comportarse tu GPT"
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contexto (opcional)</Label>
                <Textarea
                  id="context"
                  value={config.context}
                  onChange={(e) => setConfig({ ...config, context: e.target.value })}
                  placeholder="Proporciona contexto adicional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Select
                  value={config.model}
                  onValueChange={(value) => setConfig({ ...config, model: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Crear GPT
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface onConfigUpdate={setConfig} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

