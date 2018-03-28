import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import ftctable from '../css/ftctable.scss';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
class TableHead extends React.Component {
  static propTypes = {
    fields:PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
        fieldName: PropTypes.string,
        fieldSubName:PropTypes.string,
        //sortType:PropTypes.oneOf(['none','ascending','descending']),
        dataIsNumberic:PropTypes.bool,
        disableSort: PropTypes.bool
      })
    ),
    onClickToSort: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  getThs() {
    const { fields } = this.props;
    
    return fields.map( (field) => {
      if(!field) {
        return;
      }
      const keyValue = field.field;
      return (
        <th 
        aria-sort="none" /*初始aria-sort就为none */
        data-isnumberic={field.dataIsNumberic}
        data-disablesort={field.disableSort}
        key={keyValue}
        onClick={this.props.onClickToSort.bind(this, keyValue)}
        >
          {field.fieldName}
          <span styleName="headsub-cell">  
            {/*
            如果不使用react-css-module而使用普通的CSSSModule，那么组件的样式要这么写:className={styles.subfield},即每个样式的引入都要加上styles.前缀，而使用react-css-module则不用写styles前缀
            react-css-module库中: styleName对应局部class, className对应全局class
            */}
            {field.fieldSubName}
          </span>
        </th>
      )
    })
  }
  render() {
    return (
      <thead>
        <tr>
          {this.getThs()}
        </tr>
      </thead>
    );
  }
  
}

export default TableHead;