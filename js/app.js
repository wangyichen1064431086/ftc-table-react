import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FtcTable from './FtcTable';
import TableBodyRow from './TableBodyRow';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const fieldsInfoForTable = [
      {
        "field":"Cheese",
        "fieldName": "Cheese",
        "fieldSubName": "Type of cheese",
        "dataType": "",
        "disableSort": false
      },
      {
        "field":"Bread",
        "fieldName": "Bread",
        "fieldSubName": "Type of bread",
        "dataType": "",
        "disableSort": false
      },
      {
        "field": "CostGBP",
        "fieldName": "Cost",
        "fieldSubName": "(GBP)",
        "dataType": "numeric",
        "disableSort": false
      },
      {
        "field":"CostEUR",
        "fieldName": "Cost",
        "fieldSubName":"(EUR)",
        "dataType":"numeric",
        "disableSort": false
      }
    ];

    return (
      <FtcTable className="ftc-table" fieldsInfo={fieldsInfoForTable}>
        <TableBodyRow defaultOrder="0" data={
          {
            "Cheese": "cheddar",
            "Bread": "rye",
            "CostGBP":1,
            "CostEUR":1.56
          }
        }/>
        <TableBodyRow defaultOrder="1" data={
          {
            "Cheese": "stilton",
            "Bread": "wholemeal",
            "CostGBP":2,
            "CostEUR":1.85
          }
        }/>
        <TableBodyRow defaultOrder="2" data={
          {
            "Cheese": "red leicester",
            "Bread": "white",
            "CostGBP":3,
            "CostEUR":""
          }
        }/>
      </FtcTable>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);