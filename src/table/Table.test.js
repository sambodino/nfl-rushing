import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tableColumns } from './utils';

import Table from './Table';

describe('NFL Rushing Table', () => {

  beforeEach(() => {
    render(<Table columns={tableColumns} data={tableData}/>)
  })

  it('should sort by total rushing yards', async () => {
    await userEvent.click(screen.getByText('Yds'));

    const rowsDesc = await screen.findAllByRole('row')

    expect(rowsDesc[firstItemIndex].firstChild.textContent).toEqual('Charlie Whitehurst')
    expect(rowsDesc[lastItemIndex].firstChild.textContent).toEqual('Joe Flacco')

    await userEvent.click(screen.getByText('Yds'));

    const rowsAsc = await screen.findAllByRole('row')

    expect(rowsAsc[firstItemIndex].firstChild.textContent).toEqual('Joe Flacco')
    expect(rowsAsc[lastItemIndex].firstChild.textContent).toEqual('Charlie Whitehurst')
  })

  it('should sort by longest rush', async () => {
    await userEvent.click(screen.getByText('Lng'));

    const rowsDesc = await screen.findAllByRole('row')

    expect(rowsDesc[firstItemIndex].firstChild.textContent).toEqual('Breshad Perriman')
    expect(rowsDesc[lastItemIndex].firstChild.textContent).toEqual('Joe Flacco')

    await userEvent.click(screen.getByText('Lng'));

    const rowsAsc = await screen.findAllByRole('row')

    expect(rowsAsc[firstItemIndex].firstChild.textContent).toEqual('Joe Flacco')
    expect(rowsAsc[lastItemIndex].firstChild.textContent).toEqual('Breshad Perriman')
  })

  it('should sort by total rushing touchdowns', async () => {
    await userEvent.click(screen.getByText('TD'));

    const rowsDesc = await screen.findAllByRole('row')

    expect(rowsDesc[firstItemIndex].firstChild.textContent).toEqual('Shaun Hill')
    expect(rowsDesc[lastItemIndex].firstChild.textContent).toEqual('Breshad Perriman')

    await userEvent.click(screen.getByText('TD'));

    const rowsAsc = await screen.findAllByRole('row')

    expect(rowsAsc[firstItemIndex].firstChild.textContent).toEqual('Breshad Perriman')
    expect(rowsAsc[lastItemIndex].firstChild.textContent).toEqual('Shaun Hill')
  })

  it('should filter by player\'s name', async () => {
    fireEvent.change(screen.getByPlaceholderText('Search by player...'), {
      target: { value: 'Joe' },
    });

    const rows = await screen.findAllByRole('row')

    expect(rows[firstItemIndex].firstChild.textContent).toEqual('Joe Banyard')
    expect(rows[firstItemIndex + 1].firstChild.textContent).toEqual('Joe Flacco')
  })

  const tableData = [
    {
      "Player":"Joe Banyard",
      "Team":"JAX",
      "Pos":"RB",
      "Att":2,
      "Att/G":2,
      "Yds":7,
      "Avg":3.5,
      "Yds/G":7,
      "TD":2,
      "Lng":"7",
      "1st":0,
      "1st%":0,
      "20+":0,
      "40+":0,
      "FUM":0
    },
    {
      "Player":"Shaun Hill",
      "Team":"MIN",
      "Pos":"QB",
      "Att":5,
      "Att/G":1.7,
      "Yds":5,
      "Avg":1,
      "Yds/G":1.7,
      "TD":1,
      "Lng":"9",
      "1st":0,
      "1st%":0,
      "20+":0,
      "40+":0,
      "FUM":0
    },
    {
      "Player":"Breshad Perriman",
      "Team":"BAL",
      "Pos":"WR",
      "Att":1,
      "Att/G":0.1,
      "Yds":2,
      "Avg":2,
      "Yds/G":0.1,
      "TD":5,
      "Lng":"1",
      "1st":0,
      "1st%":0,
      "20+":0,
      "40+":0,
      "FUM":0
    },
    {
      "Player":"Joe Flacco",
      "Team":"BAL",
      "Pos":"QB",
      "Att":21,
      "Att/G":1.3,
      "Yds":58,
      "Avg":2.8,
      "Yds/G":3.6,
      "TD":2,
      "Lng":"16",
      "1st":6,
      "1st%":28.6,
      "20+":0,
      "40+":0,
      "FUM":1
    },
    {
      "Player":"Charlie Whitehurst",
      "Team":"CLE",
      "Pos":"QB",
      "Att":2,
      "Att/G":2,
      "Yds":1,
      "Avg":0.5,
      "Yds/G":1,
      "TD":4,
      "Lng":"2",
      "1st":0,
      "1st%":0,
      "20+":0,
      "40+":0,
      "FUM":0
    },
    {
      "Player":"Lance Dunbar",
      "Team":"DAL",
      "Pos":"RB",
      "Att":9,
      "Att/G":0.7,
      "Yds":31,
      "Avg":3.4,
      "Yds/G":2.4,
      "TD":3,
      "Lng":"10",
      "1st":3,
      "1st%":33.3,
      "20+":0,
      "40+":0,
      "FUM":0
    },
  ]
  const firstItemIndex = 2
  const lastItemIndex = firstItemIndex + (tableData.length - 1)
})
