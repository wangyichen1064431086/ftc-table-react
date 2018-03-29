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
    children: PropTypes.string
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