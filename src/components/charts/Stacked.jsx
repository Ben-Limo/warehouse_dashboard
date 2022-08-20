import React from 'react'
import { ChartComponent, SeriesCollectionDirective,
   SeriesDirective, Inject, Legend, Category,
   StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts'

import {  stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy'
// stackedCustomSeries,

const Stacked = ({ width, height, stackedChartData }) => {
  console.log(stackedChartData.sales)

  const stackedCustomSeries = [

    { dataSource: stackedChartData.sales,
      xName: 'period',
      yName: 'total',
      name: 'Sales',
      type: 'StackingColumn',
      background: 'blue',
  
    },
  
    { dataSource: stackedChartData.transactions,
      xName: 'period',
      yName: 'total',
      name: 'Transactions',
      type: 'StackingColumn',
      background: 'red',
  
    },
  ]
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      // background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked