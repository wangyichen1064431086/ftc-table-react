import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FtcTable from './FtcTable';
import TableUnit from './TableUnit';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FtcTable className="ftc-table" fieldsInfo={[
        {
          "field":"Cheese",
          "fieldName": "Cheese",
          "fieldSubName":"Type of cheese",
          "dataType":""
        },
        {
          "field":"Bread",
          "fieldName": "Bread",
          "fieldSubName":"Type of bread",
          "dataType":""
        },
        {
          "field": "CostGBP",
          "fieldName": "Cost",
          "fieldSubName":"(GBP)",
          "dataType":"numeric"
        },
        {
          "field":"CostEUR",
          "fieldName": "Cost",
          "fieldSubName":"(EUR)",
          "dataType":"numeric"
        }
      ]}>
        <TableUnit order="0" data={
          {
            "Cheese": "cheddar",
            "Bread": "rye",
            "CostGBP":1,
            "CostEUR":1.56
          }
        }/>
        <TableUnit order="1" data={
          {
            "Cheese": "stilton",
            "Bread": "wholemeal",
            "CostGBP":2,
            "CostEUR":1.85
          }
        }/>
        <TableUnit order="2" data={
          {
            "Cheese": "red leicester",
            "Bread": "white",
            "CostGBP":3,
            "CostEUR":""
          }
        }/>
      </FtcTable>
    )
  }
}