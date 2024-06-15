import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import Navbar from './components/Navbar'
const inter = Inter({ subsets: ['latin'] })
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'
import prisma from './lib/db'
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
async function getData(userId: string) {
  noStore()
  if (userId) {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        colorScheme: true,
      },
    })
    return data
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${data?.colorScheme ?? 'theme-blue'}`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
