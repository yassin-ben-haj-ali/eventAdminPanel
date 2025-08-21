import React from 'react'

type LoginLayoutProps = {
  children: React.ReactNode;
}

const LoginLayout : React.FC<LoginLayoutProps> = ({children}) => {
  return (
    <div className='flex h-screen w-screen'>
      <div className='h-full flex flex-col items-center justify-center basis-3/5'>{children}</div>
      <div className='flex items-center justify-center bg-primary basis-2/5 text-3xl font-bold text-white'>
       Des expériences mémorables
      </div>
    </div>
  )
}

export default LoginLayout