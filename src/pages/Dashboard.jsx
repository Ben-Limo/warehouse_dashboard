import React, { useState, useEffect} from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';

import { useHttpClient } from '../hooks/http-hooks';
import { useTransactionsRawData } from '../hooks/transaction-hooks';
import { useStateContext } from '../contexts/ContextProvider';

import product9 from '../data/product9.jpg';


const Dashboard = () => {
  const { currentColor } = useStateContext()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { transformTransactionsRawData } = useTransactionsRawData()
  const [rawData, setRawData] = useState([])
  const [widgetsData, setWidgetsData] = useState([])
  const [stackedChartData, setStackedChartData] = useState({})

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.setDate(now.getMonth()-6)).toISOString().slice(0,11)+'00:00:00'
    const end = new Date().toISOString().slice(0,11)+'23:59:59'
    
    try {
      const fetchData = async () => {
        const responseData = await sendRequest(
          `http://localhost:8080/api/transactions?from=${start}&to=${end}`
        );
        setRawData(responseData)
      }
      fetchData()
    } catch (err) {}
  
  }, [sendRequest])
  
  useEffect(() => {
    try {
      const [currentTransactions, priorTransactions, widgetsData, stackedChartData]  = transformTransactionsRawData(rawData)
      setWidgetsData(widgetsData)
      setStackedChartData(stackedChartData)
    } catch (err) {}
  }, [rawData, transformTransactionsRawData])
  
  return (
    <div className='mt-10'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center '>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {widgetsData.map(item => (
            <div key={item.title} 
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg 
            md:w-56 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-10 flex-wrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
          <div className='flex justify-between'>
            <p className="font-semibold text-xl">Sales Trend</p>
            <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Expense</span>
            </p>
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Budget</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
              </div>
              <div className='mt-10'>
                <Button 
                  color='white'
                  bgColor={currentColor}
                  text='Download Report'
                  borderRadius='10px'/>
              </div>
            </div>
            <div>
              <Stacked  width='320px' height='360px' stackedChartData={stackedChartData} />
            </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Dashboard