'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Instagram } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex items-center">
      {/* Menu Navigation Centered */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-6 items-center font-medium text-sm">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink 
              key={i} 
              {...link} 
              className="text-orange-900/80 hover:text-orange-600 transition-colors dark:text-zinc-300 dark:hover:text-white" 
              appearance="link" 
            />
          )
        })}
      </nav>
      
      {/* Instagram on the Right */}
      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="z-10">
        <span className="sr-only">Instagram</span>
        <Instagram className="w-5 text-orange-900/80 hover:text-orange-600 transition-colors dark:text-zinc-300 dark:hover:text-white" />
      </Link>
    </div>
  )
}
