import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import ftctable from '../css/ftctable.scss';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
class TableBodyRow extends React.Component {
  static propTypes = {
    defaultOrder: PropTypes.string.isRequired,
    expectedFields:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        fieldName: PropTypes.string,
        fieldSubName:PropTypes.string,
        //sortType:PropTypes.oneOf(['none','ascending','descending']),
        dataIsNumberic:PropTypes.bool,
        disableSort: PropTypes.bool
      })
    ),
    data: PropTypes.object
  }
  getTdsOfOneRow() {
    const { expectedFields, data } = this.props;
    
    return expectedFields.map( field => {
      const tdClass = classnames({
        'body-cell--numeric': field.dataIsNumberic
      })
      let content;
      const fieldKey = field.field;
      if (!data.hasOwnProperty(fieldKey)) {
        content = "--"
      } else {
        content = data[fieldKey];
      }
      return <td styleName={tdClass} key={fieldKey}>{content}</td>
    })
  }
  render() {
    return (
      <tr>
        {this.getTdsOfOneRow()}
      </tr>
    )
  }
}

export default TableBodyRow;