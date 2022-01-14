import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders a table titled "NFL Rushing"', () => {
    render(<App/>)
    const expectedTable = screen.getByText('NFL Rushing');

    expect(expectedTable).toHaveClass('th')
    expect(screen.getByText('NFL Rushing')).toBeInTheDocument()
  });
})
