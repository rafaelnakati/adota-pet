import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PawPrint, Calendar, ArrowLeft, Info, Heart } from 'lucide-react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { AdoptionForm } from '@/components/AdoptionForm'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    id?: string
  }>
}

export default async function AnimalPage({ params: paramsPromise }: Args) {
  const { id } = await paramsPromise

  if (!id) {
    return notFound()
  }

  const payload = await getPayload({ config: configPromise })

  let animal
  try {
    animal = await payload.findByID({
      collection: 'animals',
      id,
      depth: 1, // Populates media info
    })
  } catch (error) {
    // se payload não achar pelo id dará erro e cai no catch
    return notFound()
  }

  if (!animal || animal.status !== 'available') {
    return notFound()
  }

  // Format texts
  const genderText = animal.gender === 'male' ? 'Macho' : animal.gender === 'female' ? 'Fêmea' : ''
  const speciesText = animal.species === 'dog' ? 'Cão' : animal.species === 'cat' ? 'Gato' : ''
  const sizeMap = { small: 'Pequeno', medium: 'Médio', large: 'Grande' }
  const sizeText = animal.size ? sizeMap[animal.size] : ''

  const firstImageDoc = animal.images?.[0]?.image

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Top Banner & Back Navigation */}
      <section className="bg-zinc-900 pb-20 pt-28">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para todos os animais
          </Link>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto -mt-12 px-4 md:px-6 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-12 xl:gap-16">
          {/* Left Column: Image & Details */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            {/* Image Card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
              <div className="relative aspect-[4/3] w-full bg-zinc-100">
                {firstImageDoc ? (
                  <Media
                    resource={firstImageDoc as MediaType}
                    fill
                    imgClassName="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-400 flex-col gap-3">
                    <PawPrint className="h-12 w-12 opacity-50" />
                    <span>Nenhuma imagem cadastrada</span>
                  </div>
                )}
              </div>
            </div>

            {/* General Info */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-6">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
                    {animal.name}
                  </h1>
                  <p className="mt-2 text-lg text-zinc-500">
                    {speciesText} {animal.breed && `• ${animal.breed}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800">
                  <Heart className="h-4 w-4" />
                  Pronto para Receber Amor
                </div>
              </div>

              {/* Characteristics Grid */}
              <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
                <div className="flex flex-col rounded-2xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/50">
                  <span className="text-sm font-medium text-zinc-500">Gênero</span>
                  <span className="mt-1 font-semibold text-zinc-900">{genderText || '-'}</span>
                </div>
                <div className="flex flex-col rounded-2xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/50">
                  <span className="text-sm font-medium text-zinc-500">Idade</span>
                  <span className="mt-1 font-semibold text-zinc-900">
                    {animal.age !== undefined && animal.age !== null
                      ? `${animal.age} ${animal.age === 1 ? 'ano' : 'anos'}`
                      : 'Não informada'}
                  </span>
                </div>
                <div className="flex flex-col rounded-2xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/50">
                  <span className="text-sm font-medium text-zinc-500">Porte</span>
                  <span className="mt-1 font-semibold text-zinc-900">{sizeText || '-'}</span>
                </div>
                <div className="flex flex-col rounded-2xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/50">
                  <span className="text-sm font-medium text-zinc-500">Data de Resgate</span>
                  <span className="mt-1 font-semibold text-zinc-900">
                    {animal.rescuedAt
                      ? new Date(animal.rescuedAt).toLocaleDateString('pt-BR')
                      : 'Não informada'}
                  </span>
                </div>
              </div>

              {/* Description */}
              {animal.description && (
                <div className="pt-2">
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-zinc-900">
                    <Info className="h-5 w-5 text-orange-600" />
                    Sobre o {animal.name}
                  </h3>
                  <div className="prose prose-zinc max-w-none">
                    <p className="whitespace-pre-wrap text-zinc-600 leading-relaxed">
                      {animal.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Adoption Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
              <h2 className="mb-2 text-2xl font-bold text-zinc-900">Adotar é um ato de amor</h2>
              <p className="mb-6 text-zinc-500">
                Ficou interessado(a) em dar um lar definitivo para o {animal.name}? Preencha o
                formulário abaixo e a ONG responsável entrará em contato.
              </p>

              <AdoptionForm animalId={animal.id} animalName={animal.name} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { id } = await paramsPromise

  if (!id) return { title: 'Animal não encontrado | AdotaPet' }

  try {
    const payload = await getPayload({ config: configPromise })
    const animal = await payload.findByID({
      collection: 'animals',
      id,
    })

    return {
      title: `Adote ${animal.name} | AdotaPet`,
      description: `Conheça ${animal.name}, um ${animal.species === 'dog' ? 'cão' : 'gato'} resgatado esperando por um lar.`,
    }
  } catch (e) {
    return { title: 'Animal não encontrado | AdotaPet' }
  }
}
