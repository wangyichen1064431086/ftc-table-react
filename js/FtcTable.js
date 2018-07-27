import React from 'react';
import ReactDOM from 'react-dom';
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
    ]).isRequired,
    fieldsInfo:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        fieldName: PropTypes.string,
        fieldSubName: PropTypes.string,
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
        'table--responsive-overflow'
      ])),
      PropTypes.oneOf([
        'table--row-stripes', 
        'table--horizontal-lines', 
        'table--vertical-lines',
        'table--responsive-flat', 
        'table--responsive-overflow'
      ])
    ]),
    addStatisticInfo: PropTypes.arrayOf(
      PropTypes.oneOf([
        'sum', 
        'mean', 
        'median'
      ])
    ),
    addWrapperInfo:PropTypes.shape({
      width: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired
    })
    
    //caption:PropTypes.oneOf(['top','bottom','topandbottom','none'])
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
    this.duplicateHeader = this.duplicateHeader.bind(this);
    this.handleScrollOnWrapper = this.handleScrollOnWrapper.bind(this);
  }
  
  componentDidMount() {
    this.tBodyDom = ReactDOM.findDOMNode(this.refs.myTBody);
    this.tHeadDom = ReactDOM.findDOMNode(this.refs.myTHead);
    this.topCaptionDom = null;
    if(this.refs.topCaption) {
      this.topCaptionDom = ReactDOM.findDOMNode(this.refs.topCaption);

    }


    const { styleList } = this.props;

    if (styleList && styleList.includes('table--responsive-flat')) {
      this.duplicateHeader();
    }
 
    //处理wrapper

  }
  
  handleClickToSort(field, e) {
    console.log('handle');
    let isDisableSort = e.currentTarget.getAttribute('data-disablesort');
    if(isDisableSort==='true') {
      console.log('disablesort');
      return;
    }
    let currentSort = e.currentTarget.getAttribute('aria-sort');//'none'或'ascending'或descending'
    let tableSort = this.state.tableSort;
    
    if (tableSort==='none' || currentSort==='none' || currentSort ==='descending') {
      console.log('set state to asc');
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
  
  duplicateHeader() {//只能在componentDidMount中调用
    const tBodyDom = this.tBodyDom;
   
    const rowsOfBody = Array.from(tBodyDom.getElementsByTagName('tr'));

    const tHeadDom = this.tHeadDom;
    const thsOfHead = tHeadDom.getElementsByTagName('th');
    rowsOfBody.forEach( row => {
      const tds = Array.from(row.getElementsByTagName('td'));

      tds.forEach((td,index) => {
        row.insertBefore(thsOfHead[index].cloneNode(true), td);
      });
    })
  }
  handleScrollOnWrapper(e) {
    const scrollTop = e.currentTarget.scrollTop;
    if(this.tHeadDom) {
      this.tHeadDom.style.transform = 'translateY(' + scrollTop + 'px)';
    }
    if(this.topCaptionDom) {
      this.topCaptionDom.style.transform = 'translateY(' + scrollTop + 'px)';
    }
  }
  renderCaption(position) {
    const { captionsInfo } = this.props;
    const content = captionsInfo[position];
    const captionClass = position === 'top' ? 'caption--top' : 'caption--bottom';
    const refName = `${position}Caption`
    return (
      <TableCaption style={captionClass} ref={refName}> {/*styleName只能用在DOM组件上，如果用在react组件上则不能生效*/}
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
        ref="myTHead"
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
        ref="myTBody"
      />
    )
  }

  renderTableFoot() {
    const { addStatisticInfo } = this.props;
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
    const { styleList,captionsInfo,addStatisticInfo,addWrapperInfo } = this.props;

    let resultStyleName = classnames('table--base', styleList);//注意1.classnames拼接数组和对象的不同方式;2.styleList即使为undefined,classnames也能处理
    let addWrapper = false;
    let wrapperWidth;
    let wrapperHeight;

    if (addWrapperInfo && addWrapperInfo.width && addWrapperInfo.height) {
      wrapperWidth = addWrapperInfo.width;
      wrapperHeight = addWrapperInfo.height;
      if (parseFloat(wrapperWidth, 10) && parseFloat(wrapperHeight, 10)) {//先检查该值是否包含数字，无论是'100','100px',100,'100%'这parseFloat之后都会得到100,即该条件会进入，但parseFloat不会影响原wrapperWidth、wrapperHeight值，下面会用到parseFloat之前的值
        console.log(`parseFloat wrapperWidth: ${parseFloat(wrapperWidth, 10)}` );
        addWrapper = true;
        if(styleList && styleList.length > 0) {
          const newStyleList = styleList.filter(value => (
            value !== 'table--responsive-overflow' && value !== 'table--responsive-flat'
          ))
          resultStyleName = classnames('table--base', newStyleList);
        }
        
        //如果只有数字，那么就添上px
        if (Number(wrapperWidth)) {
          wrapperWidth += 'px';
        } 
        if (Number(wrapperHeight)) {
          wrapperHeight += 'px';
        }
      }
    }
    
    
    const tableEl = (
      <table styleName={resultStyleName}>
        { 
          (captionsInfo && captionsInfo.top) &&
          this.renderCaption('top')
        }
        {this.renderTableHead()}
        {this.renderTableBody()}
        {
          (addStatisticInfo && addStatisticInfo.length > 0) &&
          this.renderTableFoot()
        }
        {
          (captionsInfo && captionsInfo.bottom) &&
          this.renderCaption('bottom')
        }

      </table>
    );


    if (addWrapper) {//判定这两个值有效
      
      const wrapperElStyle = {//组件的行内样式必须是一个对象
        width:wrapperWidth,
        height:wrapperHeight
      };

      return (
        <div 
          style={wrapperElStyle} 
          styleName="wrapper"
          onScroll={this.handleScrollOnWrapper}
          >
          { tableEl }
        </div>
      )
    }
    return tableEl;
  }
}

export default FtcTable;