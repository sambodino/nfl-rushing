import React from 'react'
import styled from 'styled-components'

import Table from './Table'
import getData from './data';

import './App.css';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'NFL Rushing',
        columns: [
          {
            Header: 'Player',
            accessor: 'Player',
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
    ],
    []
  )

  const data = React.useMemo(() => getData(), [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App;
