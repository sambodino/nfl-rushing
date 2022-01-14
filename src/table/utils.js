import Papa from 'papaparse'

export const tableColumns = [
  {
    Header: 'NFL Rushing',
    columns: [
      {
        Header: 'Player',
        accessor: 'Player',
        filter: 'fuzzyText',
        width: 200,
      },
      {
        Header: 'Team',
        accessor: 'Team',
      },
      {
        Header: 'Pos',
        accessor: 'Pos',
      },
      {
        Header: 'Att',
        accessor: 'Att',
      },
      {
        Header: 'Att/G',
        accessor: 'Att/G',
      },
      {
        Header: 'Yds',
        accessor: 'Yds',
      },
      {
        Header: 'Avg',
        accessor: 'Avg',
      },
      {
        Header: 'Yds/G',
        accessor: 'Yds/G',
      },
      {
        Header: 'TD',
        accessor: 'TD',
      },
      {
        Header: 'Lng',
        accessor: 'Lng',
      },
      {
        Header: '1st',
        accessor: '1st',
      },
      {
        Header: '1st%',
        accessor: '1st%',
      },
      {
        Header: '20+',
        accessor: '20+',
      },
      {
        Header: '40+',
        accessor: '40+',
      },
      {
        Header: 'FUM',
        accessor: 'FUM',
      },
    ],
  },
]

export const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

export const getExportFileBlob = ({ columns, data }) => {
  const headerNames = columns.map((col) => col.exportValue);
  const csvString = Papa.unparse({ fields: headerNames, data });

  return new Blob([csvString], { type: "text/csv" });
}
