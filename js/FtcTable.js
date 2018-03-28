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
import TableBodyRow from './TableBodyRow';

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
    //caption:PropTypes.oneOf(['top','bottom','topandbottom','none'])
  }

  static defaultProps = {
    caption:'none',
    className:'table--base'
  }
  constructor(props) {
    super(props);

    const {children} = this.props
    this.bodyrowChildren = React.Children.map(children, (child)=>(
      child.type === TableBodyRow
    ));
    this.captionChildren = React.Children.map(children, (child) => (
      child.type === TableCaption
    ))
    this.immChildren = Seq(this.props.children);//利用immutable的Seq封装原来的children数组，从而使用Immutable Data进一步提升组件的渲染性能
    this.handleClickToSort = this.handleClickToSort.bind(this);

  }

  handleClickToSort() {

  }
  renderCaptions() {
    const captions = this.captionChildren;
    return captions.map( caption => {
      return React.cloneElement(caption, {
        key:caption.props.position
      })
    })
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
        rows={this.bodyrowChildren}
      />
    )
  }

  render() {
    const { className,caption } = this.props;

   // const renderTopCaption = caption ==='top' || caption === 'topandbottom';
    //const renderBottomCaption = caption ==='bottom' || caption === 'topandbottom';

    return (
      <table styleName={className}>
        { 
          renderTopCaption &&

          this.renderCaption('top')
        }

        {this.renderTableHead()}
        {this.renderTableBody()}

        {
          renderBottomCaption &&
          this.renderCaption('bottom')
        }
      </table>
    );
  }
}

export default FtcTable;