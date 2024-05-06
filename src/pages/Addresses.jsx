import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { getAllAddresses } from '../services/apiService';
import { Header } from '../components';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAllAddresses();
      if (data) {
        setAddresses(data);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title='Orders' />
      <GridComponent dataSource={addresses}>
        <ColumnsDirective>
          {/* Assuming you want to display id, latitude, longitude, and unit */}
          <ColumnDirective field='id' headerText='ID' width='100' textAlign='Center'/>
          <ColumnDirective field='latitude' headerText='Latitude' width='100' textAlign='Center'/>
          <ColumnDirective field='longitude' headerText='Longitude' width='100' textAlign='Center'/>
          <ColumnDirective field='unit' headerText='Unit' width='100' textAlign='Center'/>
          {/* Add or remove columns as needed */}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit]} />
      </GridComponent>
    </div>
  );
};

export default Addresses;