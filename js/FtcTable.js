import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { Seq } from 'immutable';

import TableHead from './TableHead';
import TableBody from './TableBody';
import TableCaption from './TableCaption';
import TableFoot from './TableFoot';
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
    }),
    styleList: PropTypes.oneOfType([ //可以是其中一个样式名，也可以是其中若干样式名的组合
      PropTypes.arrayOf(PropTypes.oneOf([
        'table--row-stripes', 
        'table--horizontal-lines', 
        'table--vertical-lines',
        'table--responsive-flat', 
        'table--responsive-overflow','table--responsive-scroll'
      ])),
      PropTypes.oneOf([
        'table--row-stripes', 
        'table--horizontal-lines', 
        'table--vertical-lines',
        'table--responsive-flat', 
        'table--responsive-overflow',
        'table--responsive-scroll'
      ])
    ]),
    addStatisticInfo: PropTypes.arrayOf(
      PropTypes.oneOf([
        'sum', 
        'mean', 
        'median'
      ])
    )
    
    //caption:PropTypes.oneOf(['top','bottom','topandbottom','none'])
  }

  static defaultProps = {
    className: '',
    captionsInfo: {
      top: '',
      bottom: ''
    },
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

  renderTableFoot() {
    const { addStatisticInfo } = this.props;
    console.log('renderTableFoot');
    return (
      <TableFoot 
        key="tableFoot"
        statisticArr = { addStatisticInfo }
        fields={this.props.fieldsInfo}
        rows={ this.immChildren }
      />
    )
  }

  render() {
    const { styleList,captionsInfo,addStatisticInfo } = this.props;
    console.log(addStatisticInfo);
   // const renderTopCaption = caption ==='top' || caption === 'topandbottom';
    //const renderBottomCaption = caption ==='bottom' || caption === 'topandbottom';
    const resultStyleName = classnames('table--base', styleList);//注意classnames拼接数组和对象的不同方式

    const footRowsLen = addStatisticInfo.length;
    console.log(footRowsLen);
    return (
      <table styleName={resultStyleName}>
        { 
          captionsInfo.top &&
          this.renderCaption('top')
        }

        {this.renderTableHead()}
        {this.renderTableBody()}

        
        {
          footRowsLen > 0 &&
          this.renderTableFoot()
        }

        {
          captionsInfo.bottom &&
          this.renderCaption('bottom')
        }

      </table>
    );
  }
}

export default FtcTable;