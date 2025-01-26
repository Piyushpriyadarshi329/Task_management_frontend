import {
    ArrowRightIcon,
    ArrowLeftIcon,
    HomeIcon,
    CogIcon,
  } from '@heroicons/react/24/outline';
  import { useContext, useState } from 'react';
  import SidebarItem from './SidebarItem';
import { authContext } from './../App';
  
  
  // This sidebar component is for both mobile and desktop
  function Sidebar({ children, expanded, setExpanded }: any) {
    const auth:any =  useContext(authContext)

    return (
      <div className="relative">
        {/* 
          This div is used to create the background overlay when the sidebar is expanded
          It is only visible on mobile screens
        */}
        <div
          className={`fixed inset-0 -z-10 block bg-gray-800  ${expanded ? 'block sm:hidden' : 'hidden'}`}
        style={{position:"sticky"}}
        />
        <aside
          className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-70' : 'w-0 sm:w-20'}`}
        >
          <nav className="flex h-full flex-col border-r bg-white shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <img
                src="https://img.logoipsum.com/243.svg"
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-32' : 'w-0'
                }`}
                alt=""
              />
              <div className={`${expanded ? '' : 'hidden sm:block'}`}>
                <button
                  onClick={() => setExpanded((curr: boolean) => !curr)}
                  className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
                >
                  {!expanded ? (
                    <ArrowRightIcon className="h-6 w-6" />
                  ) : (
                    <ArrowLeftIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            <ul className="flex-1 px-3">{children}</ul>
            <div className="flex border-t p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Piyush+Priyadarshi"
                alt=""
                className="h-10 w-10 rounded-md"
              />
              <div
                className={`
                flex items-center justify-between
                overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}
            `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{auth?.user?.name}</h4>
                  <span className="text-xs text-gray-600">{auth?.user?.email}</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    );
  }
  
  export default function MakeSidebar() {
    const [expanded, setExpanded] = useState(true);
    const navBarItems = [
      {
        icon: <HomeIcon />,
        text: 'Task Management',
        path:"/task"
      },
      {
        icon: <CogIcon />,
        text: 'Feed',
        path:"/Feed"
      },
      {
        icon: <CogIcon />,
        text: 'Logout',
        path:"/logout"
      },
     
    ];
  
    // Desktop Sidebar
    return (
      <div 
      style={{position:"relative"}}
      className='flex'>

      
      <div
      style={{
        position:"sticky",
        top:0,
        height: "100vh"

      }}
      >
<Sidebar expanded={expanded} setExpanded={setExpanded}>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
      </Sidebar>
      </div>
      </div>
      
    );
  }