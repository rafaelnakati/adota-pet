import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-orange-200/50 bg-orange-50 dark:bg-zinc-900 text-orange-950 dark:text-zinc-50">
      <div className="container py-10 gap-8 flex flex-col md:flex-row md:justify-between items-center">
        <Link className="flex items-center" href="/">
          <Logo bgColor="transparent" />
        </Link>

        <div className="flex flex-col-reverse items-center md:flex-row gap-4">
          <nav className="flex flex-col md:flex-row gap-6 font-medium text-sm">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-orange-900/80 hover:text-orange-600 transition-colors dark:text-zinc-300 dark:hover:text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
