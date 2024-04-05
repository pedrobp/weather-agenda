import ReminderDialog, { dialogMode } from '../ReminderDialog'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../../store/getStore'

describe('Reminder configuration component', () => {
  let data = {}
  let onClose = jest.fn()

  const renderComponent = () =>
    render(
      <ReduxProvider store={store}>
        <ReminderDialog
          open={true}
          handleClose={onClose}
          data={data}
          handleChangeData={(d) => (data = d)}
          mode={dialogMode.CONFIG}
          handleChangeMode={() => {}}
        />
      </ReduxProvider>
    )

  it('should render', () => {
    renderComponent()
    expect(screen.getByText(/^Reminder Details/i)).toBeInTheDocument()
  })

  it('should add reminder', () => {
    data = {
      id: 'test-id',
      description: 'test description',
      city: 'test city',
      date: new Date(2021, 8, 19, 9, 45)
    }

    renderComponent()

    // fires add reminder action and checks if reminder was added
    fireEvent.click(screen.getByTestId('add-reminder'))
    expect(store.getState().reminders.value).toContainEqual(data)
  })

  it('should change input values', () => {
    renderComponent()
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'test reminder' }
    })
    expect(data.description).toEqual('test reminder')

    fireEvent.change(screen.getByTestId('city-input'), {
      target: { value: 'test city' }
    })
    expect(data.city).toEqual('test city')

    fireEvent.change(screen.getByTestId('date-input'), {
      target: { value: '2021-07-24T15:00' }
    })
    expect(data.date).toEqual('2021-07-24T15:00')
  })

  it('should call the onClose function', () => {
    renderComponent()

    fireEvent.click(screen.getByTestId('close-button'))

    expect(onClose).toBeCalledTimes(1)
  })
})
