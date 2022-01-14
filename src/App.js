import React from 'react'
import styled from 'styled-components'

import Table from './Table'
import getData from './data';

import './App.css';

const Styles = styled.div`
  padding: 1rem;
 
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 1px solid black;
      }
    }
}
`

function App() {
  const data = React.useMemo(() => getData(), [])

  return (
    <Styles>
      <Table data={data} />
    </Styles>
  )
}

export default App;
