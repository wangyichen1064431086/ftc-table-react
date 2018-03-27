import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from '../css/style.scss';

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TableBody extends React.Component {
  static propTypes = {
    units: PropTypes.object
  }

  getRows() {

  }
}