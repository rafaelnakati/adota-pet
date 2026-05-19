'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

type Props = {
  animalId: string
  animalName: string
}

export const AdoptionForm: React.FC<Props> = ({ animalId, animalName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      animal: animalId,
      status: 'new',
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar o formulário.')
      }

      setSuccess(true)
    } catch (err: any) {
      setError('Ocorreu um erro ao enviar sua solicitação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50 p-8 text-center ring-1 ring-inset ring-green-200">
        <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-lg font-semibold text-green-900">Pedido Enviado com Sucesso!</h3>
        <p className="text-sm text-green-700">
          Recebemos o seu interesse em adotar {animalName}. A equipe da ONG entrará em contato
          em breve através do telefone fornecido.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 ring-1 ring-inset ring-red-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-900">
          Nome Completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Seu nome"
          className="w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-zinc-900">
            Telefone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            placeholder="(00) 00000-0000"
            className="w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-900">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="seu@email.com"
            className="w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-900">
          Mensagem (Opcional)
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          placeholder="Conte-nos um pouco sobre você e porque quer adotar..."
          className="w-full rounded-xl border-0 bg-zinc-100 px-4 py-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          'Enviando Solicitação...'
        ) : (
          <>
            Enviar Solicitação
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-2 text-center text-xs text-zinc-500">
        Seus dados serão enviados diretamente para a ONG responsável pelo resgate.
      </p>
    </form>
  )
}
