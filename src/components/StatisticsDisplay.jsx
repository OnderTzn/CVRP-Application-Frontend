import React from 'react';
import { GoDotFill } from "react-icons/go";
import Bar from './Charts/Bar';

const StatisticsDisplay = ({ title, stats, chartData, chartId }) => {
  return (
    <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-900'>
      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>{title}</p>
        <div className='flex items-center gap-4'>
          {/* Icons and labels can be further componentized if they are reused elsewhere */}
          
        </div>
      </div>
      <div className='mt-10 flex gap-10 flex-wrap justify-center'>
        <div className='border-r-1 border-color m-4 pr-10'>
          {stats.map((stat, index) => (
            <div key={index} className='mt-8'>
              <p>
                <span className='text-3xl font-semibold'>{stat.value}</span>
                {stat.percentage && (
                  <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-500 ml-3 text-xs'>
                    {stat.percentage}
                  </span>
                )}
              </p>
              <p className='text-gray-500 mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>
        <div>
          <Bar width='800px' height='360px' data={chartData} chartId={chartId} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsDisplay;