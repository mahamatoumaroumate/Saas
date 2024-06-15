import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserNav from './UserNav'
const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className='border-b bg-background h-[10vh] flex items-center '>
      <div className='max-w-[1300px] px-8 mx-auto flex justify-between w-full'>
        <div className='container flex items-center justify-between '>
          <Link href='/'>
            <h1 className='hidden sm:block text-2xl font-bold '>
              Mahamat Saas
            </h1>
            <h1 className='block sm:hidden text-2xl font-bold '>M</h1>
          </Link>
        </div>
        <div className='flex items-center gap-x-5 '>
          <ThemeToggle />
          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className='flex items-center gap-2 sm:gap-5'>
              <LoginLink>
                {' '}
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant='secondary'>Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
