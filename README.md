# ftc-table-react

[![NPM version](https://img.shields.io/npm/v/npm.svg?style=flat)](https://www.npmjs.com/package/@ftchinese/ftc-table-react)


The React version for ftc-table. 

It provides some features for a table: sorting by each column, showing caculating results, fixing the table's head if necessary...

## Install
```
cd yourProject
npm install "@ftchinese/ftc-table-react" --save 
```

## Usage
Example:
```
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {FtcTable, TableBodyRow} from '@ftchinese/ftc-table-react.js';


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
        "dataIsNumberic": false,
        "disableSort": false
      },
      {
        "field":"Bread",
        "fieldName": "Bread",
        "fieldSubName": "Type of bread",
        "dataIsNumberic": false,
        "disableSort": false
      },
      {
        "field": "CostGBP",
        "fieldName": "Cost",
        "fieldSubName": "(GBP)",
        "dataIsNumberic": true,
        "disableSort": false
      },
      {
        "field":"CostEUR",
        "fieldName": "Cost",
        "fieldSubName":"(EUR)",
        "dataIsNumberic": true,
        "disableSort": false
      }
    ];
    const captionsInfoForTable = {
      top: "Top Caption",
      bottom: "Bottom Caption"
    };
    const styleListValue = [
      "table--row-stripes"
    ];
    const statisticInfoArr = ['sum', 'mean', 'median'];

    return (
      <FtcTable 
        styleList={styleListValue} 
        fieldsInfo={fieldsInfoForTable} 
        captionsInfo={captionsInfoForTable}  
        addStatisticInfo={statisticInfoArr}
        >
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

```