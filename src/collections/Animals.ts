import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Animals: CollectionConfig = {
  slug: 'animals',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'species', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'species',
      type: 'select',
      required: true,
      options: [
        { label: 'Cachorro', value: 'dog' },
        { label: 'Gato', value: 'cat' },
      ],
    },
    {
      name: 'breed',
      type: 'text',
    },
    {
      name: 'age',
      type: 'number',
    },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Pequeno', value: 'small' },
        { label: 'Médio', value: 'medium' },
        { label: 'Grande', value: 'large' },
      ],
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Macho', value: 'male' },
        { label: 'Fêmea', value: 'female' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Disponível', value: 'available' },
        { label: 'Pendente', value: 'pending' },
        { label: 'Adotado', value: 'adopted' },
      ],
    },
    {
      name: 'rescuedAt',
      type: 'date',
    },
  ],
}
