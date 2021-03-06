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
        field: PropTypes.string.isRequired,
        fieldName: PropTypes.string,
        fieldSubName:PropTypes.string,
        dataIsNumberic:PropTypes.bool,
        disableSort: PropTypes.bool
      })
    ).isRequired,
    onClickToSort: PropTypes.func.isRequired,
    tableSort: PropTypes.oneOf(['none','ASC','DSC']).isRequired,
    sortByField: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
  }
  getThs() {
    const { fields, sortByField, tableSort } = this.props;
    
    return fields.map( (field) => {
      if(!field) {
        return;
      }
      const keyValue = field.field;
      const fieldName = field.fieldName ? field.fieldName : keyValue;
      let ariaSortOfTh = "none";//默认每个aria-sort都为none
      if (keyValue === sortByField ) {//找到当前点击的field,对其进行特殊处理
        ariaSortOfTh = tableSort==='ASC' ? 'ascending' : 'descending'; //点击之后的tableSort只有'ASC'和'DSC'两种可能
      } 
      return (
        <th 
        aria-sort={ariaSortOfTh} 
        data-disablesort={field.disableSort || false}//TORETHINK：这里会得到的是一个字符串'false'而非boolean
        key={keyValue}
        onClick={this.props.onClickToSort.bind(this, keyValue)}
        >
          {fieldName}
          {
            field.fieldSubName && (
              <span styleName="headsub-cell">  
                {/*
                如果不使用react-css-module而使用普通的CSSSModule，那么组件的样式要这么写:className={styles.subfield},即每个样式的引入都要加上styles.前缀，而使用react-css-module则不用写styles前缀
                react-css-module库中: styleName对应局部class, className对应全局class
                */}
                {field.fieldSubName}
              </span>
            )
          }
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