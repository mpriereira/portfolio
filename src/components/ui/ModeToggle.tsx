import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<string | undefined>(undefined)

  const switchTheme = (theme: 'light' | 'dark' | 'system') => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    setTheme(theme)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    setMounted(true)
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') ?? 'system')
    }
  }, [mounted]);

  if (!mounted) {
    return <div className="size-[40px]"></div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={`bg-inherit hover:bg-gray-300/75 dark:hover:bg-white/5 border-none dark:border-none backdrop-blur-xl ${theme !== 'system' ? 'text-violet-600 dark:text-violet-400 hover:text-violet-600 hover:dark:text-violet-400' : 'text-inherit'}`}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
