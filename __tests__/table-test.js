jest.unmock('../js/FtcTable');
jest.unmock('../js/TableBodyRow');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FtcTable from '../js/FtcTable';
import TableBodyRow from '../js/TableBodyRow';

describe('Table with least data', () => {
  it('render the Table', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1'
            },
            {
              field:'field2'
            }
          ]
        }
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelector('thead')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('tbody')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('thead').querySelectorAll('th').length).toBe(2);
    expect(ftcTableNode.querySelector('tbody').querySelectorAll('tr').length).toBe(2);
  });
});

describe('Table with fieldsInfo', () => {
  it('render with fieldsInfo.dataIsNumberic', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelector('thead')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('tbody')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('thead').querySelectorAll('th').length).toBe(2);
    expect(ftcTableNode.querySelector('tbody').querySelectorAll('tr').length).toBe(2);
    expect(ftcTableNode.querySelector('tbody tr td:nth-child(1)').className.includes('body-cell--numeric')).toBe(false);
    expect(ftcTableNode.querySelector('tbody tr td:nth-child(2)').className.includes('body-cell--numeric')).toBe(true);
  });
});


describe('Table with captionsInfo', () => {
  it('render with captionsInfo.top ', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
        captionsInfo ={{
          top: "Top Caption"
          
        }}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelector('caption')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('caption').className.includes('caption--top')).toBe(true);
    expect(ftcTableNode.querySelector('caption').className.includes('caption--bottom')).toBe(false);
  });

  it('render with captionsInfo.bottom ', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
        captionsInfo ={{
          bottom: "Bottom Caption"
          
        }}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelector('caption')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('caption').className.includes('caption--top')).toBe(false);
    expect(ftcTableNode.querySelector('caption').className.includes('caption--bottom')).toBe(true);
  });

  it('render with captionsInfo.top and .bottom', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
        captionsInfo ={{
          top: "Top Caption",
          bottom: "Bottom Caption"
        }}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelectorAll('caption').length).toBe(2);
  });
});

describe('Table with styleList', () => {
  it('render with styleList: "table--row-stripes" ', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
            }
          ]
        }
        styleList = "table--row-stripes"
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.className.includes('table--row-stripes')).toBeTruthy;
  
  });
  it('render with styleList: multipile classes ', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
            }
          ]
        }
        styleList = {["table--row-stripes",
        "table--vertical-lines",
        "table--horizontal-lines",
        "table--responsive-overflow",
        "table--responsive-flat"]}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.className.includes('table--row-stripes')).toBeTruthy;
    expect(ftcTableNode.className.includes('table--vertical-lines')).toBeTruthy;
    expect(ftcTableNode.className.includes('table--horizontal-lines')).toBeTruthy;
    expect(ftcTableNode.className.includes('table--responsive-overflow')).toBeTruthy;
    expect(ftcTableNode.className.includes('table--responsive-flat')).toBeTruthy;
  });
  it('render with responsive style, it should be valid with wrapper', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
            }
          ]
        }
        styleList = {[
        "table--vertical-lines",
        "table--responsive-overflow",
        "table--responsive-flat"]}
        wrapperInfo = {{
          width:'100%',
          height:'180px'
        }}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.className.includes('table--vertical-lines')).toBeTruthy;
    expect(ftcTableNode.className.includes('table--responsive-overflow')).toBeFalsy;
    expect(ftcTableNode.className.includes('table--responsive-flat')).toBeFalsy;
  });
});

describe('Table with addStatisticInfo', () => {
  it('render with statistic: sum ', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
        addStatisticInfo = {['sum']}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );

    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);

    expect(ftcTableNode.querySelector('tfoot')).toBeInstanceOf(HTMLElement);
    expect(ftcTableNode.querySelector('tfoot tr th').innerHTML.replace(/^\s+|\s+$/g,'')).toBe('sum');
    expect(ftcTableNode.querySelector('tfoot tr').querySelector('td:nth-child(2)').innerHTML.replace(/^\s+|\s+$/g,'')).toBe('70');

  });

});

describe('Table with wrapper', () => {
  it('render with wrapper with 100% width and 180px height', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
        addWrapperInfo={ {
          width:'100%',
          height:'180px'
        }}
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );
  
    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);
    const wrapperNode = ftcTableNode.parentNode;
    expect(wrapperNode).toBeInstanceOf(HTMLElement);
    expect(wrapperNode.className.includes('wrapper')).toBeTruthy;

    //TORETHIINK:这里好像是因为Jest测试并不是在真实的DOM中运行，只是在JSDOM模拟的DOM中运行，所以offsetHeight和getBoundingClientRect().height都为0
   // expect(wrapperNode.offsetHeight).toBe(180);
    //expect(wrapperNode.getBoundingClientRect().height).toBe(180);
  })
  
});

describe('The sorting feature of Table', () => {
  it('Before click,there is no sorting', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );
  
    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);
    expect(ftcTableNode.querySelector('thead tr th:nth-child(2)').getAttribute('aria-sort')).toBe('none');
 
  });
  it('Click the th of second column 2 times', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );
  
    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);
    
    ReactTestUtils.Simulate.click(
      ftcTableNode.querySelector('thead tr th:nth-child(2)')
    );
    expect(ftcTableNode.querySelector('thead tr th:nth-child(2)').getAttribute('aria-sort')).toBe('ascending');

    ReactTestUtils.Simulate.click(
      ftcTableNode.querySelector('thead tr th:nth-child(2)')
    );//NOTE：只有两个click写到一个it里面才会同步执行；如果写在不同的it里面那么不同的it是不同的异步任务，结果都是第一次点击的结构
    expect(ftcTableNode.querySelector('thead tr th:nth-child(2)').getAttribute('aria-sort')).toBe('descending');
 
 
  });

  /*
  it('Click the th of second column second time', () => {
    const ftcTable = ReactTestUtils.renderIntoDocument(
      <FtcTable
        fieldsInfo = {
          [
            {
              field:'field1',
            },
            {
              field:'field2',
              dataIsNumberic: true
            }
          ]
        }
      >
        <TableBodyRow
          defaultOrder="0"
          data={{
            field1:'Apple',
            field2:'20'
          }}
        />
        <TableBodyRow
          defaultOrder="1"
          data={{
            field1:'Cherry',
            field2:'50'
          }}
        />
      </FtcTable>
    );
  
    const ftcTableNode = ReactDOM.findDOMNode(ftcTable);
    
    
  });
  */
})