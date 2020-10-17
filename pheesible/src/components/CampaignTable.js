import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Link } from 'react-router-dom'

import facebook from '../images/facebook.png'
import edit from '../images/edit.png'
import report from '../images/report.png'

const getStatusElement = (status) => {
  const props = {
    className: 'btn',
    style: { cursor: 'default', width: '170px' },
  }
  switch (status) {
    case 1:
      return (
        <div {...props} className={props.className + ' btn-outline-primary'}>
          DRAFT
        </div>
      )

    case 2:
      return (
        <div {...props} className={props.className + ' btn-warning'}>
          PENDING REVIEW
        </div>
      )

    case 3 || 4:
      return (
        <div {...props} className={props.className + ' btn-outline-info'}>
          PUBLISHING
        </div>
      )
    case 5:
      return (
        <div {...props} className={props.className + ' btn-info'}>
          RUNNING
        </div>
      )

    case 6:
      return (
        <div {...props} className={props.className + ' btn-success'}>
          DONE
        </div>
      )
    case 7:
      return (
        <div {...props} className={props.className + ' btn-danger'}>
          ERROR
        </div>
      )
    case 8:
      return (
        <div {...props} className={props.className + ' btn-danger'}>
          REJECTED
        </div>
      )
    default:
      return <div></div>
  }
}

export default ({ promotions, setChosenPromotion }) => {
  const { SearchBar } = Search
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'statusId',
      text: 'Status',
      formatter: (cell, row) => getStatusElement(row.statusId),
      sort: true,
    },
    {
      dataField: 'charge',
      text: 'Charge',
      sort: true,
      formatter: (_, row) =>
        row.charge
          ? '$' + parseFloat(parseInt(row.charge) / 100).toFixed(2)
          : 'N/A',
    },
    {
      dataField: 'createDate',
      text: 'Created',
      type: 'date',
      sort: true,
    },
    {
      dataField: 'startDate',
      text: 'Started',
      type: 'date',
      sort: true,
      formatter: (_, row) => {
        if (!row.startDate) return <span>N/A</span>
        return row.startDate
      },
    },
    {
      dataField: 'facebook.numberOfDays',
      text: 'Total Days',
      sort: true,
      formatter: (_, row) => {
        return row.facebook ? (
          <>
            <img src={facebook} alt='facebook' className='icon' />
            <span className='ml-3'>{row.facebook.numberOfDays} days</span>
          </>
        ) : (
          ''
        )
      },
    },
    {
      dataField: '',
      text: '',
      formatter: (cell, row) => {
        return (
          <>
            {row.statusId === 1 ? (
              <a
                href='#'
                onClick={() => {
                  console.log('editing')
                  setChosenPromotion(row.id)
                }}>
                <img className='icon' src={edit} alt='edit' />
              </a>
            ) : (
              <img className='icon' src={edit} alt='edit' />
            )}
            {row.statusId === 5 || row.statusId === 6 ? (
              <Link to={'/report?id=' + row.id}>
                <img className='icon' src={report} alt='report' />
              </Link>
            ) : (
              <img className='icon' src={report} alt='report' />
            )}
          </>
        )
      },
    },
  ]

  return (
    <ToolkitProvider
      defaultSorted={[{ dataField: 'createDate', order: 'desc' }]}
      keyField='id'
      data={promotions}
      columns={columns}
      search>
      {(props) => (
        <div>
          <SearchBar {...props.searchProps} />
          <hr />
          <div className='table-responsive'></div>
          <BootstrapTable
            classes='text-center'
            pagination={paginationFactory()}
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}
