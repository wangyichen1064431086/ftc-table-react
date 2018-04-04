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
});
