import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import DashboardNavbar from './DashboardNavbar'
import {Outlet, useLocation} from "react-router-dom"
import PendingApproval from '../pages/seller/PendingApproval'
import SellerSidebar from './SellerSidebar'

const SellerLayout = () => {
    const [isSidebarOpen,setIsSidebarOpen]=useState(false)
    const {user}=useAuth()
    const location=useLocation()

    const isPublicDashboardRoute=['/contact','/profile'].includes(
        location.pathname
    )
  return (
    <div className='flex h-screen bg-bg-alt overflow-hidden'>
        <SellerSidebar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} />

        <div className='flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300 md:ml-[260px]'>
            <DashboardNavbar onMenuClick={()=> setIsSidebarOpen(true)} />
                <main className='flex-1 overflow-y-auto p-5 md:p-8 relative scroll-smooth fade-in'>
                    {user?.isApproved ||isPublicDashboardRoute ?(
                        <Outlet/>
                    ):(
                        <PendingApproval/>
                    )}
                </main>
        </div>

    </div>
  )
}

export default SellerLayout