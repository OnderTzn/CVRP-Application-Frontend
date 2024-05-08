import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { GoDotFill } from "react-icons/go";

import { Stacked, Button, Bar } from '../components'
import { earningData, SparklineAreaData, ecomPieChartData, barExTimeData } from '../data/projectData'
import { useStateContext } from '../contexts/ContextProvider'
import StatisticsDisplay from '../components/StatisticsDisplay';

import { barTimeXAxis, barDistanceXAxis, barExTimeXAxis } from '../data/projectData';

const Dashboard = () => {
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 md:h-48 rounded-xl w-full lg:w-3/4 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Welcome to Route Master</p>
              <p className='text-2xl '>Welcome to our routing platform! We use smart algorithms to help you find the best routes quickly and efficiently. Start planning your journey with us today for a smoother travel experience.</p>
            </div>
          </div>          
        </div>
      </div>      

      <div className='flex gap-10 flex-wrap justify-center '>
        {/* Total travel distance */}
        <StatisticsDisplay
          title="Total travel time in seconds"
          stats={[
            { value: '1h 27m 09s', label: 'Algorithm 1 in 40 addresses' },
            { value: '1h 20m 23s', percentage: '7.76%', label: 'Algorithm 2 in 40 addresses' }
          ]}
          chartData={barTimeXAxis}
          chartId="time"
        />

        {/* Total travel distance */}
        <StatisticsDisplay
          title="Total travel distance in meters"
          stats={[
            { value: '1000m',  label: 'Algorithm 1 in 40 addresses' },
            { value: '2000m', percentage: '23%', label: 'Algorithm 2 in 40 addresses' }
          ]}
          chartData={barDistanceXAxis}
          chartId="distance"
        />

        {/* Execution time  */}
        <StatisticsDisplay
          title="Execution time"
          stats={[
            { value: '1000 ms',  label: 'Algorithm 1' },
            { value: '2000 ms', percentage: '23%', label: 'Algorithm 2' }
          ]}
          chartData={barExTimeXAxis}
          chartId="execution-time"
        />
      </div>
    </div>
  )
}

export default Dashboard