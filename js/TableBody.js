import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from '../css/style.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TableBody extends React.Component {
  static propTypes = {
    rows: PropTypes.object,
    expectedFields:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        fieldName: PropTypes.string,
        fieldSubName:PropTypes.string,
        //sortType:PropTypes.oneOf(['none','ascending','descending']),
        dataIsNumberic:PropTypes.bool
      })
    ),
  }

  getRows() {
    const { rows, expectedFields} = this.props;

    return rows.map( row => {
      if (!row) {
        return;
      }
      const defaultOrder = parseInt(row.props.defaultOrder,10);
      return React.cloneElement(row, {
        key:`tbodyrow-default${defaultOrder}`,
        expectedFields
      })
    })
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