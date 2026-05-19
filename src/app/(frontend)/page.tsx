import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { AnimalCard } from '@/components/AnimalCard'
import { PawPrint } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AdotaPet - Encontre seu novo melhor amigo',
  description: 'Plataforma unificada para gerenciar e adotar animais resgatados.',
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: animals } = await payload.find({
    collection: 'animals',
    limit: 20,
    where: {
      status: {
        equals: 'available',
      },
    },
    depth: 1, // To populate media inside images
  })

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900 py-32 sm:py-40">
        <div className="absolute inset-0 z-0">
          <img
            // src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop"
            src="/images/adota-pet-hero.webp"
            alt="Cães resgatados"
            className="h-full w-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                <PawPrint className="h-4 w-4 text-orange-400" />
                <span>AdotaPet</span>
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Encontre o seu <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                novo melhor amigo
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-zinc-300 sm:text-xl">
              De animais resgatados a lares amorosos. Transforme uma vida hoje. Conheça nossos
              peludos esperando por você.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-20 md:px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Disponíveis para Adoção
          </h2>
          <p className="mt-4 text-lg text-zinc-500">
            {animals.length > 0
              ? `Conheça ${animals.length} peludos que estão aguardando ansiosamente um novo lar.`
              : 'Atualmente não temos novos peludos para adoção.'}
          </p>
        </div>

        {animals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white py-24 text-center max-w-3xl mx-auto px-4">
            <div className="mb-4 rounded-full bg-zinc-100 p-4">
              <PawPrint className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900">Nenhum animal disponível</h3>
            <p className="max-w-md text-zinc-500">
              No momento não temos animais cadastrados aguardando adoção. Sinta-se livre para voltar
              mais tarde!
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
