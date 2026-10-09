import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import LoginComponent from '../component/login/Login'

function Login() {
  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen flex flex-col">
      <div className="page-x border-b border-border">
        <Header theme="light" />
      </div>
      
      <div className="flex-grow flex items-center justify-center py-6 sm:py-10 px-0">
        <div className="w-full">
          <LoginComponent />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Login