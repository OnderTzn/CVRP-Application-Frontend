import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import { MdDeleteOutline, MdOutlineSupervisorAccount, MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaRegAddressBook, FaRoute, FaMapMarkedAlt   } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

export const links = [ /*Buttons for sidebar */
  {
    title: '',
    links: [
      {
        name: 'Dashboard',
        icon: <MdOutlineSpaceDashboard />,
        path: '/dashboard',
      },
      {
        name: 'Addresses',
        icon: <FaRegAddressBook />,
        path: '/addresses',
      },
      {
        name: 'Add address',
        icon: <VscAdd />,
        path: '/add-address',
      },
      {
        name: 'Route',
        icon: <FaRoute />,
        path: '/route',
      },
      {
        name: 'Map',
        icon: <FaMapMarkedAlt />,
        path: '/map',
      },
      {
        name: 'Results',
        icon: <TbReportAnalytics />,
        path: '/results',
      },      
    ],
  },
];

export const gridAddressStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const addressGrid = [
  {
    field: 'Id',
    headerText: 'Id',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'Latitude',
    headerText: 'Latitude', 
    width: '200',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'Longitude',
    headerText: 'Longitude', 
    width: '200',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'Unit',
    headerText: 'Unit', 
    width: '200',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'Edit',
    headerText: 'Edit',
    width: '150',
    textAlign: 'Center',
  },
];

export const barTimeData = [
  [
    { x: '15 Adr 20 Cap', y: 6423 },
    { x: '40 Adr 100 Cap', y: 8906 },
    { x: '100 Adr 200 Cap', y: 12344 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 6584 },
    { x: '40 Adr 100 Cap', y: 9933 },
    { x: '100 Adr 200 Cap', y: 18566},
  ],
  [
    { x: '15 Adr 20 Cap', y: 5767 },
    { x: '40 Adr 100 Cap', y: 12250 },
    { x: '100 Adr 200 Cap', y: 32206 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 5677 },
    { x: '40 Adr 100 Cap', y: 8906 },
    { x: '100 Adr 200 Cap', y: 12344 },
  ],
];

export const barTimeXAxis = [
  {
    dataSource: barTimeData[0],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barTimeData[1],
    xName: 'x',
    yName: 'y',
    name: 'Savings',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barTimeData[2],
    xName: 'x',
    yName: 'y',
    name: 'Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barTimeData[3],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor w/Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];

export const barDistanceData = [
  [
    { x: '15 Adr 20 Cap', y: 30993 },
    { x: '40 Adr 100 Cap', y: 42624 },
    { x: '100 Adr 200 Cap', y: 57722 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 31602 },
    { x: '40 Adr 100 Cap', y: 48092 },
    { x: '100 Adr 200 Cap', y: 88744 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 27761 },
    { x: '40 Adr 100 Cap', y: 60204 },
    { x: '100 Adr 200 Cap', y: 158760 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 27266 },
    { x: '40 Adr 100 Cap', y: 42624 },
    { x: '100 Adr 200 Cap', y: 57722 },
  ],
];


export const barDistanceXAxis = [
  {
    dataSource: barDistanceData[0],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barDistanceData[1],
    xName: 'x',
    yName: 'y',
    name: 'Savings',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barDistanceData[2],
    xName: 'x',
    yName: 'y',
    name: 'Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barDistanceData[3],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor w/Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];

export const barExTimeData = [
  [
    { x: '15 Adr 20 Cap', y: 854 },
    { x: '40 Adr 100 Cap', y: 3870 },
    { x: '100 Adr 200 Cap', y: 22057 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 1526 },
    { x: '40 Adr 100 Cap', y: 10095 },
    { x: '100 Adr 200 Cap', y: 67219 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 262466 },
    { x: '40 Adr 100 Cap', y: 279645 },
    { x: '100 Adr 200 Cap', y: 664992 },
  ],
  [
    { x: '15 Adr 20 Cap', y: 251279 },
    { x: '40 Adr 100 Cap', y: 273048 },
    { x: '100 Adr 200 Cap', y: 672670 },
  ],
];


export const barExTimeXAxis = [
  {
    dataSource: barExTimeData[0],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barExTimeData[1],
    xName: 'x',
    yName: 'y',
    name: 'Savings',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barExTimeData[2],
    xName: 'x',
    yName: 'y',
    name: 'Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barExTimeData[3],
    xName: 'x',
    yName: 'y',
    name: 'Nearest Neighbor w/Simulated Annealing',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];






{/* Data buranın üstünde */}
{/* Data buranın üstünde */}
{/* Data buranın üstünde */}
{/* Data buranın üstünde */ }

export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },

};
export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: 'transparent' },
};

export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}%',
  rangePadding: 'None',
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];

export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];

export const stackedCustomSeries = [

  { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',

  },

  { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  },

];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};
