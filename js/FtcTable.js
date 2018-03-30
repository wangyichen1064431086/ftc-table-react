import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { Seq } from 'immutable';

import TableHead from './TableHead';
import TableBody from './TableBody';
import TableCaption from './TableCaption';

import ftctable from '../css/ftctable.scss';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
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
    ).isRequired,
    captionsInfo: PropTypes.shape({
      top:PropTypes.string,
      bottom: PropTypes.string
    })
    
    //caption:PropTypes.oneOf(['top','bottom','topandbottom','none'])
  }

  static defaultProps = {
    className: 'table--base',
    captionsInfo: {
      top: '',
      bottom: ''
    }
  }
  constructor(props) {
    super(props);

    const {children} = this.props;
    
    this.immChildren = Seq(this.props.children);//利用immutable的Seq封装原来的children数组，从而使用Immutable Data进一步提升组件的渲染性能
    
    this.state = {
      tableSort:'none',//或'ASC'或'DSC'
      sortByField: '',//为某一列的field值
    }
    
    this.handleClickToSort = this.handleClickToSort.bind(this);

  }

  handleClickToSort(field, e) {
    let currentSort = e.currentTarget.getAttribute('aria-sort');//'none'或'ascending'或descending'
    let tableSort = this.state.tableSort;
    
    if (tableSort==='none' || currentSort==='none' || currentSort ==='descending') {
      this.setState({
        tableSort:'ASC',
        sortByField: field
      })
    } else {
      this.setState({
        tableSort:'DSC',
        sortByField: field
      })
    }


  }
  renderCaption(position) {
    const { captionsInfo } = this.props;
    const content = captionsInfo[position];
    const captionClass = position === 'top' ? 'caption--top' : 'caption--bottom';
    return (
      <TableCaption style={captionClass}> {/*待确认：styleName只能用在DOM组件上，如果用在react组件上则不能生效*/}
        {content}
      </TableCaption>
    
    )
  }
  renderTableHead() {
    return (
      <TableHead 
        key="tableHead"
        tableSort = {this.state.tableSort}
        sortByField = {this.state.sortByField}
        onClickToSort={this.handleClickToSort}
        fields={this.props.fieldsInfo}

      />
    )
  }

  renderTableBody() {
    return (
      <TableBody 
        key="tableBody"
        tableSort = {this.state.tableSort}
        sortByField = {this.state.sortByField}
        expectedFields={this.props.fieldsInfo}
        rows={this.immChildren}
      />
    )
  }

  render() {
    const { className,captionsInfo } = this.props;

   // const renderTopCaption = caption ==='top' || caption === 'topandbottom';
    //const renderBottomCaption = caption ==='bottom' || caption === 'topandbottom';

    return (
      <table styleName={className}>
        { 
          captionsInfo.top &&
          this.renderCaption('top')
        }

        {this.renderTableHead()}
        {this.renderTableBody()}

        {
          captionsInfo.bottom &&
          this.renderCaption('bottom')
        }
      </table>
    );
  }
}

export default FtcTable;