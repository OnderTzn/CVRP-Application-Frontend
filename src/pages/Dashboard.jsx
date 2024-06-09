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
              <p className='text-2xl '>Welcome to Route Master! Our advanced algorithms are designed to optimize your travel routes, saving you time and effort. Begin your journey with us and experience seamless and efficient route planning. See the effectiveness of our algorithms below.</p>
            </div>
          </div>          
        </div>
      </div>      

      <div className='flex gap-10 flex-wrap justify-center '>
        {/* Total travel distance */}
        <StatisticsDisplay
          title="Total travel time in seconds"
          stats={[
            { value: '2h 28m 26s', label: 'Nearest Neighbor in 40 addresses' },
            { value: '2h 45m 33s', percentage: '-11.54%', label: 'Savings in 40 addresses' },
            { value: '3h 24m 33s', percentage: '-37.55%', label: 'Simulated Annealing in 40 addresses' },
            { value: '2h 28m 26s', percentage: '0%', label: 'Hybrid in 40 addresses' }
          ]}
          chartData={barTimeXAxis}
          chartId="time"
        />

        {/* Total travel distance */}
        <StatisticsDisplay
          title="Total travel distance in meters"
          stats={[
            { value: '42km 624m',  label: 'Nearest Neighbor in 40 addresses' },
            { value: '48km 92m', percentage: '-12.83%', label: 'Savings in 40 addresses' },
            { value: '60km 204m', percentage: '-41.25%', label: 'Simulated Annealing in 40 addresses' },
            { value: '42km 624m', percentage: '0%', label: 'Hybrid in 40 addresses' }
          ]}
          chartData={barDistanceXAxis}
          chartId="distance"
        />

        {/* Execution time  */}
        <StatisticsDisplay
          title="Execution time"
          stats={[
            { value: '0m 3s 870ms',  label: 'Nearest Neighbor in 40 addresses' },
            { value: '0m 10s 95ms', percentage: '-160.84%', label: 'Savings in 40 addresses' },
            { value: '4m 39s 645ms', percentage: '-7125.19%', label: 'Simulated Annealing in 40 addresses' },
            { value: '4m 33s 48ms', percentage: '-6951.37%', label: 'Hybrid in 40 addresses' }
          ]}
          chartData={barExTimeXAxis}
          chartId="execution-time"
          axisType="Logarithmic"
        />
      </div>
    </div>
  )
}

export default Dashboard