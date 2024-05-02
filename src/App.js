import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { registerLicense } from '@syncfusion/ej2-base';

import './App.css';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Addresses, Routing, Map, Reports, Area, Bar, ColorMapping, Line, Pyramid, Stacked } from './pages';
import { GoogleMap } from '@react-google-maps/api';

import { useStateContext } from'./contexts/ContextProvider';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpecXVXQmFeUkRyX0I=');

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{ zIndex: '1000'}}>
            <TooltipComponent content='Settings' position='Top'>
              <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
              style={{ background: '#0F172A', borderRadius: '50%' }}>
                <FiSettings />       
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar 
            dark:bg-secondary-dark-bg
            bg-white' >
              <Sidebar />
            </div>
          ) : (
              <div className='w-0 dark:bg-secondary-dark-bg'>
                <Sidebar />
              </div>
          )}
          <div className={
            `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
          }>
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>
          </div>

          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />

            {/* Pages */}
            <Route path='/addresses' element={<Addresses />} />
            <Route path='/route' element={<Routing />} />
            <Route path='/map' element={<Map />} />
            <Route path='/reports' element={<Reports />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;