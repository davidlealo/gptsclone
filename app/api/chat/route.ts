import { OpenAI } from 'openai'
import { type Message, type GPTConfig } from '../../../types/gpt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `Eres un asistente experto en ayudar a crear GPTs personalizados.
Tu trabajo es ayudar a entender qué quiere crear el usuario y generar una configuración apropiada.
Debes extraer: nombre, descripción, instrucciones y contexto opcional de la conversación.`

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    const { messages } = await req.json()

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ]
    })

    const assistantMessage = completion.choices[0].message

    if (!assistantMessage || !assistantMessage.content) {
      throw new Error('No response from OpenAI')
    }

    // Intentamos extraer la configuración del GPT de la respuesta
    let config: GPTConfig | null = null
    try {
      const configMatch = assistantMessage.content.match(/\{[\s\S]*\}/)
      if (configMatch) {
        const parsedConfig = JSON.parse(configMatch[0])
        config = {
          name: parsedConfig.name || '',
          description: parsedConfig.description || '',
          instructions: parsedConfig.instructions || '',
          context: parsedConfig.context || '',
          model: parsedConfig.model || 'gpt-3.5-turbo'
        }
      }
    } catch (e) {
      console.error('Error parsing config:', e)
    }

    return Response.json({
      message: {
        role: 'assistant',
        content: assistantMessage.content
      },
      config
    })
  } catch (error) {
    console.error('Error in POST /api/chat:', error)
    return Response.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 })
  }
}

