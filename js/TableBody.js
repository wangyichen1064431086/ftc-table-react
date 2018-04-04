import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import ftctable from '../css/ftctable.scss';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
class TableBody extends React.Component {
  static propTypes = {
    rows: PropTypes.object.isRequired, //Seq之后类型变为object, Seq之前是Props.node或Props.arrayOf(PropTypes.node)
    expectedFields:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        fieldName: PropTypes.string,
        fieldSubName:PropTypes.string,
        dataIsNumberic:PropTypes.bool,
        disableSort: PropTypes.bool
      })
    ),
    tableSort: PropTypes.oneOf(['none','ASC','DSC']).isRequired,
    sortByField: PropTypes.string.isRequired
  }

  getRows() {
    const { rows, expectedFields, sortByField, tableSort } = this.props;
    let infoOfSortByField = {};
    //console.log(expectedFields);
    expectedFields.forEach( fieldInfo => {
      if (fieldInfo.field === sortByField) {
        infoOfSortByField = fieldInfo;
      }
    });

    //console.log('type of rows', typeof rows); object
    //console.log(rows);
    let unsortedRows = rows.map( row => {//这是Seq的方法
      if (!row) {
        return;
      }
      const defaultOrder = parseInt(row.props.defaultOrder,10);
      return React.cloneElement(row, {
        key:`tbodyrow-default${defaultOrder}`,
        expectedFields
      })
    })

    if ( tableSort === 'none') {
      return unsortedRows;
    }
    //console.log(unsortedRows.sort);
    return unsortedRows.sort((aRow, bRow) => { //这也是immutable库的Seq提供的方法
      let sortValueOfARow = aRow.props.data[sortByField];
      let sortValueOfBRow = bRow.props.data[sortByField];

      if (typeof sortValueOfARow === 'string') {
        sortValueOfARow = sortValueOfARow.replace(/^\s+|\s+$/g, "");
        if (infoOfSortByField.dataIsNumberic) {
          sortValueOfARow = parseFloat(sortValueOfARow, 10);
        }
      }
      if (typeof sortValueOfBRow === 'string') {
        sortValueOfBRow = sortValueOfBRow.replace(/^\s+|\s+$/g, "");
        if (infoOfSortByField.dataIsNumberic) {
          sortValueOfBRow = parseFloat(sortValueOfBRow, 10);
        }
      }

      if (tableSort === 'ASC' ) {
       // console.log('ASC');
        return this.ascendingSort(sortValueOfARow, sortValueOfBRow);
      } else {
        // console.log('DSC');
        return this.descendingSort(sortValueOfARow, sortValueOfBRow);
      }
    });
  }

  ascendingSort(a, b) {
    if ( a < b || a !== a) {
      return -1;
    } else if ( a > b || b !== b) {
      return 1;
    } else {
      return 0;
    }
  }

  descendingSort(a,b) {
    return 0 - this.ascendingSort(a, b);
  }

  render() {
    return (
      <tbody>
        {this.getRows()}
      </tbody>
    )
  }
}


export default TableBody;