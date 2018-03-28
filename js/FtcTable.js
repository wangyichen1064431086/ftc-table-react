import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { Seq } from 'immutable';

import TableHead from './TableHead';
import TableBody from './TableBody';
import styles from '../css/style.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class FtcTable extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([

      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    fieldsInfo:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        fieldName: PropTypes.string,
        fieldSubName: PropTypes.string,
        //sortType:PropTypes.oneOf(['none','ascending','descending']),
        dataIsNumberic: PropTypes.bool,
        disableSort: PropTypes.bool
      })
    )
  }

  constructor(props) {
    super(props);

    this.immChildren = Seq(this.props.children);//利用immutable的Seq封装原来的children数组，从而使用Immutable Data进一步提升组件的渲染性能
    this.handleClickToSort = this.handleClickToSort.bind(this);

  }

  handleClickToSort() {

  }
  renderTableHead() {
    return (
      <TableHead 
        key="tableHead"
        onClickToSort={this.handleClickToSort}
        fields={this.props.fieldsInfo}
      />
    )
  }

  renderTableBody() {
    return (
      <TableBody 
        key="tableBody"
        expectedFields={this.props.fieldsInfo}
        rows={this.immChildren}
      />
    )
  }

  render() {
    const { className } = this.props;
    return (
      <table styleName={className}>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </table>
    );
  }
}

export default FtcTable;