import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import ftctable from '../css/ftctable.scss';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
class TableCaption extends React.Component {
  static propTypes = {
    style: PropTypes.string,
    children: PropTypes.node //children应该是PropTypes.node或PropTypes.arrayOf(PropTypes.node),或PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]), oneOf和oneOfType不一样
  }

  render() {
    const { style, children} = this.props;
    return (
      <caption styleName={style}>
        {children}
      </caption>
    )
  }
}

export default TableCaption;