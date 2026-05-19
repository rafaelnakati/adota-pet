import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'animal', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'animal',
      type: 'relationship',
      relationTo: 'animals',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Contatado', value: 'contacted' },
        { label: 'Aprovado', value: 'approved' },
        { label: 'Rejeitado', value: 'rejected' },
      ],
    },
  ],
}
