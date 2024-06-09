import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import { getAllResults } from '../services/apiService';
import { Header } from '../components';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getAllResults();
      if (data) {
        console.log('Fetched Results:', data); // Log fetched results
        setResults(data);
      }
    };
    fetchResults();
  }, []);

  // Function to format algorithmType
  const formatAlgorithmType = (props) => {
    const algorithmMapping = {
      NearestNeighbor: 'Nearest Neighbor',
      Savings: 'Savings',
      SimulatedAnnealing: 'Simulated Annealing',
      NearestNeighborSA: 'Nearest Neighbor & SA'
    };
    return algorithmMapping[props.algorithmType] || props.algorithmType;
  };

  // Template function for algorithmType column
  const algorithmTypeTemplate = (props) => {
    return <span>{formatAlgorithmType(props)}</span>;
  };

  // Handle row click
  const handleRowClick = (event) => {
    setSelectedResult(event.data);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='' title='Results' />
      <GridComponent id='gridcomp' dataSource={results} allowPaging allowSorting toolbar={['Search']} width='auto' rowSelected={handleRowClick}>
        <ColumnsDirective>
          <ColumnDirective field='id' headerText='ID' width='100' textAlign='Center'/>
          <ColumnDirective field='algorithmType' headerText='Algorithm' width='150' textAlign='Center' template={algorithmTypeTemplate} />
          <ColumnDirective field='addressCount' headerText='Address Count' width='150' textAlign='Center'/>
          <ColumnDirective field='vehicleCapacity' headerText='Vehicle Capacity' width='150' textAlign='Center' />
          <ColumnDirective field='initialTemperature' headerText='Initial Temperature' width='150' textAlign='Center' />
          <ColumnDirective field='coolingRate' headerText='Cooling Rate' width='150' textAlign='Center' />
          <ColumnDirective field='totalTime' headerText='Total Time' width='150' textAlign='Center' />
          <ColumnDirective field='totalDistance' headerText='Total Distance' width='150' textAlign='Center' />    
          <ColumnDirective field='executionTime' headerText='Execution Time' width='150' textAlign='Center' />          
          <ColumnDirective field='returnsToDepot' headerText='Returns to Depot' width='150' textAlign='Center' />
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Search, Toolbar]} />
      </GridComponent>

      {selectedResult && (
        <DialogComponent 
          width='600px' 
          header='Route Legs Details' 
          visible={showModal} 
          showCloseIcon={true} 
          onHide={closeModal}>
          <div>
            {selectedResult.routeLegs.map((leg, index) => (
              <div key={index}>
                <p>{index + 1}: From {leg.originId} to {leg.destinationId} - Distance: {leg.distance}m, Time: {leg.time}s, Vehicle Capacity Used: {leg.vehicleCapacity} units</p>
              </div>
            ))}
          </div>
        </DialogComponent>
      )}
    </div>
  );
};

export default Results;
