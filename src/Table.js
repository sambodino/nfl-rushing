import React from 'react'
import { useFilters, useSortBy, useTable } from 'react-table'
import { matchSorter } from 'match-sorter'
import { useExportData } from 'react-table-plugins'
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

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    exportData,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      getExportFileBlob,
      getExportFileName: () => 'nfl-rushing',
    },
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

  return (
    <>
      <button onClick={() => exportData('csv', false)}>Export to CSV</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                isSortableColumn(column.id) ?
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' ▲' : ' ▼' : ''}
                  </span>
                </th> :
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{isFilterableColumn(column.id) ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table;
