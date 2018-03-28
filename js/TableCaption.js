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
    location: PropTypes.oneOf(['top','bottom'])
  }
  static defaultProps = {
    location: 'top'
  }

  render() {
    return (
      <caption>
        
      </caption>
    )
  }
}