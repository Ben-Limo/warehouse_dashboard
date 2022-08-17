import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import {Navbar, Footer, Sidebar, ThemeSettings} from './components'
import {Dashboard, Transactions, Products, Calendar, Employees, 
  Stacked, Pyramid, Customers, Materials, Categories, Stores, Kanban, Line, Area, Bar, Pie,
  Financial, ColorPicker, Editor} from './pages'

import { useStateContext } from './contexts/ContextProvider'

import './App.css'

const App = () => {
  const { activeMenu } = useStateContext()
  
  return (
    <div>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4 style={{ zIndex: "1000" }}'>
            <TooltipComponent content='Settings' position='Top'>
              <button type="button"
                style={{ background: 'blue', borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>)
          }
          <div
             className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }>
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
                <Navbar /> 
              
          </div>
          <div>
            <Routes>
              {/* dashboard */}
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />

              {/* pages */}
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/stores' element={<Stores />} />

              <Route path='/products' element={<Products />} />
              <Route path='/materials' element={<Materials />} />
              <Route path='/categories' element={<Categories />} />

              {/* apps */}
              <Route path='/kanban' element={<Kanban />} />
              <Route path='/editor' element={<Editor />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/color-picker' element={<ColorPicker />} />
              
              {/* charts */}
              <Route path='/line' element={<Line />} />
              <Route path='/area' element={<Area />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/financial' element={<Financial />} />
            </Routes>
          </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App