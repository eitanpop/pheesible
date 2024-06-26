import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Link } from 'react-router-dom'

import { deletePromotion } from '../services/api'
import facebook from '../images/facebook.png'
import edit from '../images/edit.png'
import report from '../images/report.png'
import del from '../images/delete.png'
import eye from '../images/eye.png'

const getStatusElement = (status) => {
  const props = {
    className: 'btn',
    style: {
      cursor: 'default',
      width: '170px',
    },
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

    case 3:
    case 4:
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
      return <div>{status}</div>
  }
}

export default ({ promotions, setChosenPromotion, onCampaignDeleted }) => {
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
                onClick={(e) => {
                  e.preventDefault()
                  console.log('editing')
                  setChosenPromotion(row.id)
                }}>
                <img className='icon' src={edit} alt='edit ' />
              </a>
            ) : (
              <img
                className='icon'
                src={edit}
                style={{ opacity: '0.3' }}
                alt='edit disabled'
              />
            )}
            {row.statusId === 5 || row.statusId === 6 ? (
              <Link to={'/report/' + row.id}>
                <img className='icon' src={report} alt='report' />
              </Link>
            ) : (
              <img
                className='icon'
                style={{ opacity: '0.3' }}
                src={report}
                alt='report disabled'
              />
            )}
            {row.statusId === 1 ||
            row.statusId === 6 ||
            row.statusId === 7 ||
            row.statusId === 8 ? (
              <a
                href='#'
                onClick={async (e) => {
                  if (
                    !window.confirm(
                      'Are you sure you wish to archive this campaign?'
                    )
                  )
                    return
                  const response = await deletePromotion(row.id)
                  console.log('response', response)
                  onCampaignDeleted(row.id)
                }}>
                <img className='icon' src={del} alt='delete' />
              </a>
            ) : (
              <img
                className='icon'
                style={{ opacity: '0.3' }}
                src={del}
                alt='delete disabled'
              />
            )}
            {row.statusId === 1 || row.statusId === 2 ? (
              <img
                className='icon'
                style={{ opacity: '0.3' }}
                src={eye}
                alt='view disabled'
              />
            ) : (
              <a
                href={`https://www.pheesible.com/site/${row.id}`}
                target='_blank'>
                <img className='icon' src={eye} alt='view' />
              </a>
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
            id='table-campaigns'
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
