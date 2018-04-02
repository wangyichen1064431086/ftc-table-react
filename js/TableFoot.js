import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import ftctable from '../css/ftctable.scss';

import { sumOfAll, meanOfAll, medianOfAll} from './statisticFunc.js';

@immutableRenderDecorator
@CSSModules(ftctable, { allowMultiple: true })
class TableFoot extends React.Component {
  static propTypes = {
    statisticArr: PropTypes.arrayOf(
      PropTypes.oneOf([
        'sum', 
        'mean', 
        'median'
      ])
    ),
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
    rows: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.statisticTool =  {
      'sum': sumOfAll,
      'mean': meanOfAll,
      'median': medianOfAll
    };
    const {statisticArr} = this.props;
    this.validStatisticArr = statisticArr.filter( item => (this.statisticTool[item] instanceof Function));//过滤得到有效的统计字段数组
  }

  getFootRows() {
    const {fields, rows} = this.props;
    const validStatisticArr = this.validStatisticArr;
    const statisticResultsForEachField = {}; //每一项为一个Object，形如:
    /**
       {
         'CostGBP':{
           'sum': xx,
           'mean': xx,
           'median': xx
          },
          'CostEUR': {
            'sum': xx,
            'mean': xx,
            'median': xx
          }
        }
     */
    fields.forEach( fieldItem => {//对于每个filed，得到那一列的相关统计数据
      if (!fieldItem.dataIsNumberic) {//只处理dataIsNumberic的列,所以得到的统计数据单元一定是numberic的，所以可以放心加上'body-cell--numeric'css类
        return;
      }
      
      const fieldKey = fieldItem.field;
      const fieldRelatedDataArr = [];
      rows.forEach( row => {
        const fieldRelatedData = row.props.data[fieldKey];
        fieldRelatedDataArr.push(fieldRelatedData);
      });

      const statisticResults = {};
      validStatisticArr.forEach ( statisticName => {
        statisticResults[statisticName] = this.statisticTool[statisticName](fieldRelatedDataArr);
      });

      statisticResultsForEachField[fieldKey] = statisticResults;
    })

    return validStatisticArr.map( statisticName => {//得到一堆tr,这里一定要用map而不能用forEach，否则不能返回数组

      const trContent = fields.map( (fieldItem, index) => {
        const fieldKey = fieldItem.field;
        if (index === 0) {
          return <th key="statisticName"> {statisticName} </th> ;
        } else {
          if(statisticResultsForEachField[fieldKey]) {
            return <td key={fieldKey} styleName="body-cell--numeric">{statisticResultsForEachField[fieldKey][statisticName]}</td>;
          } else {
            return <td key={fieldKey}>--</td>;
          }
        }
      })
      return (
        <tr key={statisticName}>
          { trContent }
        </tr>
      )
    });
  }

  render() {
    return (
      <tfoot>
        {this.getFootRows()}
      </tfoot>
    )
  }
}

export default TableFoot;