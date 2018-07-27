# ftc-table-react
[![](https://travis-ci.org/wangyichen1064431086/ftc-table-react.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-table-react)

The React version for ftc-table. 

It provides some features for a table: sorting by each column, showing caculating results, fixing the table's head if necessary...

## Install
```c
cd yourProject
npm install "@ftchinese/ftc-table-react" --save 
```

## Usage
Example:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import {FtcTable, TableBodyRow} from '@ftchinese/ftc-table-react';


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
## API
The exported components are <code>FtcTable</code> and <code> TableBodyRow </code>.

### Props For FtcTable

#### children
Type Array of or one <code>TableBodyRow</code>. Required. The FtcTable should need TableBodyRow to be as children

#### fieldsInfo
Type Array of Object. Required. The information data for the fileds of the table's thead.The Object should has following prop:

##### field
Type String. Required. The unique code for one field.

##### fieldName
Type String. Optional. The showing name for the field in the thead of table. If it is missing, the <code>field</code> will show instead.

##### fieldSubName
Type String. Optional. The showing subname for the field in the thead of table. 

##### dataIsNumberic
Type Boolean. Optional. If it is true, the column of data of this field will be regarded as Number, which will effect the result of sorting of the data in the column and the style of the column.

##### disableSort
Type Boolean. Optional. If it is true, the sorting for the data of this column will be disabled.

#### captionsInfo
Type Object. Optional. The words for the captions of the table. It has two keys:

##### top
Type String. Optional. The words for the top caption. If it is missing. The table will have no top caption.

##### bottom
Type String. Optional. The words for the bottom caption. If it is missing. The table will have no bottom caption.

#### styleList
Type Array of String or Type String. The style name(s) for the table. There are 5 style names for choosing:

- ftc-table--row-stripes: Add row stripe related styles to table, making the adjacent 2 rows with 2 colors.
- ftc-table--horizontal-lines: Add horizontal lines to table.
- ftc-table--vertical-lines: Add vertical lines to table.
- "table--responsive-overflow": Add overflow responsive related styles to table.
- "table--responsive-flat":Add flat responsive related styles to table.

The <code>ftc-table--row-stripes</code>、<code>ftc-table--horizontal-lines</code>、<code>ftc-table--vertical-lines</code> can be selected only one or selected two or three at one time.

The <code>table--responsive-overflow</code>、<code>table--responsive-flat</code> should be selected only one at one time. If they are both selected, the one writing last will go into effect. And if there is a prop <code>addWrapperInfo</code>(as follows), both of the responsive style will be invalid.

#### addStatisticInfo

Type Array. Optional. The item of the Array should be one of 'sum', 'mean', 'median'.  If it has values,  the corresponding
statistical results will be showed in the tfoot. The statistics are only for the column whose data are Number(That's to say, the <code>dataIsNumberic</code> of the column's corresponding data in <code>fieldsInfo</code> is true)

#### addWrapperInfo

Type Object. Optional. The sizes of the wrapper of the table.  It has two keys, <code>width</code> and <code>height</code>, which describe the length of the table's width and height. Both keys are required, if one of the keys are missing or the <code>addWrapperInfo</code> is missing, the table will not have a wrapper. If the table has a wrapper, the thead of the table will be fixed on top when vertically scrolling the content of the table.

The values of  <code>width</code> and <code>height</code> can be String or Number. If they are String, they can be values for the CSS properties 'width' and 'height' such as '100%','80px'. If they are Number, they means 'px'.

### Props For TableBodyRow 
<!--TODO: 需要把这个TableBodyRow变成可选的，就是让数据全部作为从FtcTable的prop-->
#### defaultOrder
Type number.Optional. The default index for the row. The initially showing for the rows will follow this order. If it is missing, the initial orders  are depended on the writing orders for the <code>TableBodyRow</code>.

#### data
Type Object. Required. The data for one row. The keys of it should be same as the value of <code>field</code> of the item of <code>fieldsInfo</code> in parent component <code>FtcTable</code>