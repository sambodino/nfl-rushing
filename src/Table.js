import React from 'react'
import { FixedSizeList } from 'react-window'
import { useBlockLayout, useFilters, useSortBy, useTable } from 'react-table'
import { useExportData } from 'react-table-plugins'
import { matchSorter } from 'match-sorter'
import Papa from 'papaparse'

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val

function DefaultColumnFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder={`Search by player...`}
    />
  )
}

const getExportFileBlob = ({ columns, data }) => {
  const headerNames = columns.map((col) => col.exportValue);
  const csvString = Papa.unparse({ fields: headerNames, data });

  return new Blob([csvString], { type: "text/csv" });
}

const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

function Table({ columns, data }) {
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      width: 75,
    }),
    []
  )

  const {
    exportData,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      getExportFileBlob,
      getExportFileName: () => 'nfl-rushing',
    },
    useBlockLayout,
    useFilters,
    useSortBy,
    useExportData,
  )

  const isSortableColumn = (headerId) => {
    switch (headerId) {
      case 'Yds':
        return true
      case 'Lng': 
        return true
      case 'TD': 
        return true
      default:
        return false
    }
  }

  const isFilterableColumn = (headerId) => {
    return headerId === 'Player'
  }

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  return (
    <>
      <button onClick={() => exportData('csv', false)} style={{display:'block'}}>Export to CSV</button>
      <div {...getTableProps()}  className="table">
        <div>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                isSortableColumn(column.id) ?
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' ▲' : ' ▼' : '◆'}
                  </span>
                </div> :
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                  <div>{isFilterableColumn(column.id) ? column.render('Filter') : null}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={400}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth+scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </>
  )
}

export default Table;
