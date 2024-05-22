import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import { getAllAddresses } from '../services/apiService';
import { Header } from '../components';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

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

  const handleDeletionSuccess = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleEditSuccess = (id, latitude, longitude, unit) => {
    setAddresses(addresses.map(address => address.id === id ? { ...address, latitude, longitude, unit } : address));
  };

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='' title='Addresses' />
      <GridComponent id='gridcomp' dataSource={addresses} allowPaging allowSorting toolbar={['Search']} width='auto'>
        <ColumnsDirective>
          <ColumnDirective field='id' headerText='ID' width='100' textAlign='Center'/>
          <ColumnDirective field='latitude' headerText='Latitude' width='100' textAlign='Center'/>
          <ColumnDirective field='longitude' headerText='Longitude' width='100' textAlign='Center'/>
          <ColumnDirective field='unit' headerText='Demand' width='100' textAlign='Center' />
          <ColumnDirective field='edit' headerText='Edit' width='100' textAlign='Center'
            template={(props) => (
              <div className='flex items-center justify-center space-x-2'>
                <EditButton id={props.id} latitude={props.latitude} longitude={props.longitude} unit={props.unit} onEditSuccess={handleEditSuccess} />
                <DeleteButton id={props.id} onDeletionSuccess={handleDeletionSuccess} />
              </div>)}
        />
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Addresses;