import React from 'react'
import Link from 'next/link'
import type { Animal, Media as MediaType } from '@/payload-types'
import { Info } from 'lucide-react'
import { Media } from '@/components/Media'

type Props = {
  animal: Animal
}

export const AnimalCard: React.FC<Props> = ({ animal }) => {
  const { id, name, species, breed, age, size, gender, images } = animal

  const firstImageDoc = images?.[0]?.image

  // Format texts
  const genderText = gender === 'male' ? 'Macho' : gender === 'female' ? 'Fêmea' : ''
  const speciesText = species === 'dog' ? '🐶 Cão' : species === 'cat' ? '🐱 Gato' : ''
  const sizeMap = { small: 'Pequeno', medium: 'Médio', large: 'Grande' }
  const sizeText = size ? sizeMap[size] : ''

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-sm hover:scale-105">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
        {firstImageDoc ? (
          <Media
            resource={firstImageDoc as MediaType}
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
            Sem Imagem
          </div>
        )}

        {/* Gender Badge */}
        {genderText && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur-md">
            {genderText}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 truncate">{name}</h3>
          {age !== undefined && age !== null && (
            <span className="flex shrink-0 items-center rounded-lg bg-orange-100/80 px-2 py-1 text-xs font-medium text-orange-800">
              {age} {age === 1 ? 'ano' : 'anos'}
            </span>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2 text-sm text-zinc-500">
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-900">{speciesText}</span>
            {breed && <span className="opacity-70 truncate max-w-[120px]">• {breed}</span>}
          </p>
          {sizeText && <span className="opacity-70">• {sizeText}</span>}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Link
            href={`/animais/${id}`}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-orange-900 py-3 text-sm font-semibold text-orange-50 transition-all hover:bg-orange-800 active:scale-[0.98]"
          >
            Conhecer {name.split(' ')[0]}
            <Info className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
          </Link>
        </div>
      </div>
    </div>
  )
}
