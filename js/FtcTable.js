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
    caption: 'none',
    className: 'table--base',
    captionsInfo: {
      top: '',
      bottom: ''
    }
  }
  constructor(props) {
    super(props);

    const {children} = this.props;
    /*
    this.bodyrowChildren = React.Children.map(children, (child)=>{
      console.log(child.type.displayName);//Wrapper
      console.log(child.getDisplayName());
      if(child instanceof TableBodyRow) {
        return child;
      } else {
        return null;
      }
    });
    console.log(this.bodyrowChildren);
    */
    /*
    this.captionChildren = childrenArr.filter((child) => (
      child.type === TableCaption
    ))
    */
    this.immChildren = Seq(this.props.children);//利用immutable的Seq封装原来的children数组，从而使用Immutable Data进一步提升组件的渲染性能
    this.handleClickToSort = this.handleClickToSort.bind(this);

  }

  handleClickToSort() {

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