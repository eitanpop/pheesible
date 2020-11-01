import React from 'react'
import { useParams } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'

import useReport from '../hooks/api/useReport'
import Info from '../components/Info'
import '../styles/reports.css'
import company from '../images/report/company.svg'
import rectangle from '../images/report/rectangle.svg'
import insta from '../images/report/insta.png'
import facebook from '../images/report/facebook.png'
import cursor from '../images/report/cursor.png'
import magnifier from '../images/report/magnifier.png'
import currency from '../images/report/currency.png'
import lead_icon from '../images/report/lead_icon.png'
import score from '../images/report/score.png'

export default () => {
  const { id } = useParams()
  const report = useReport(id)

  console.log('report', report)

  console.log('report', report)

  if (report.loading)
    return <div>Loading real time results from focus groups...</div>
  const { entries, leads, promotion, facebookUrl } = report.data

  const getClicksByGender = (gender) =>
    entries
      .filter((x) => x.gender === gender)
      .sort((a, b) => (a.age > b.age ? 1 : -1))
      .map((x) => parseInt(x.clicks))

  console.log(
    'males',
    entries.filter((x) => x.gender === 'unknown')
  )

  console.log('male')

  const data = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Male',
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        data: getClicksByGender('male'),
        barPercentage: 0.5,
      },
      {
        label: 'Female',
        backgroundColor: 'rgb(27, 168, 240,0.7)',
        data: getClicksByGender('female'),
        barPercentage: 0.5,
      },
      {
        label: 'Unknown',
        backgroundColor: 'rgb(200, 202, 199, 0.7)',
        data: getClicksByGender('unknown'),
        barPercentage: 0.5,
      },
    ],
  }

  const getReach = () =>
    entries.reduce((n, { reach }) => n + parseInt(reach), 0)

  const getClicks = () =>
    entries.reduce((n, { clicks }) => n + parseInt(clicks), 0)

  const getImpressions = () =>
    entries.reduce((n, { impressions }) => n + parseInt(impressions), 0)

  const getSpent = () =>
    entries.reduce((n, { spend }) => n + parseFloat(spend), 0).toFixed(2)

  const getDaysRunning = () => {
    const oneDay = 24 * 60 * 60 * 1000
    const diffDays = Math.round(
      Math.abs(
        (new Date(new Date().toISOString()) - new Date(promotion.startDate)) /
          oneDay
      )
    )
    return diffDays > promotion.facebook.numberOfDays
      ? promotion.facebook.numberOfDays
      : diffDays
  }

  const getEndDate = () => {
    const d = new Date(new Date(promotion.startDate + ' UTC').toString())
    console.log('d', d)
    d.setDate(d.getDate() + parseInt(promotion.facebook.numberOfDays))
    return d
  }

  return (
    <>
      <section className='company-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 d-flex my-3'>
              <img src={company} alt='company' />
              <h1 className='text-center ml-3'>Campaign Name</h1>
            </div>
          </div>
          <div className='company-info-container p-3 p-md-5'>
            <div className='row'>
              <div className='col-lg-8'>
                <p className='name'>Reach</p>
                <p className='text-blue'>{getReach()}</p>
                <div className='d-flex flex-column flex-md-row align-items-start'>
                  <img
                    src={score}
                    style={{ width: '40px' }}
                    alt=''
                    className='float-left mr-4 mb-2'
                  />
                  <div>
                    <p className='rating-bold'>
                      Positive Response:{' '}
                      {((getClicks() / getReach()) * 100).toFixed(2)}
                    </p>
                    <p className='rating'>
                      The positive response is a numeric value determined by
                      clicks and reach.{' '}
                      <Info tooltip='It is difficult to ascribe meaning to the value as different industries will have different values. You can however use the number as a reference point for example when comparing similar products or ideas.' />{' '}
                    </p>
                    <p>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={facebookUrl}>
                        Facebook Ad
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 text-lg-center campaing-info'>
                <p>
                  Campaign running <b>{getDaysRunning()}</b> day
                  {getDaysRunning() === 1 ? '' : 's'}
                </p>
                <p>
                  <img src={facebook} alt='' />
                  {promotion.facebook.includeInstagram ? (
                    <img src={insta} alt='' />
                  ) : (
                    ''
                  )}
                  <span>Ads Campaign</span>
                </p>
                <p>
                  <strong>End Date</strong> <br />
                  <span>{getEndDate().toLocaleDateString()}</span>
                </p>
                <a
                  href='javascript:void(Tawk_API.toggle())'
                  className='btn btn-orange'>
                  Ask us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='company-stat'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7'>
              <h4 className='my-4'>Abcdef</h4>
              <div className='quantity d-flex flex-column flex-md-row justify-content-between'>
                <div className='orange-bg d-flex flex-column justify-content-end pb-5'>
                  <p className='text-white'>{getClicks()}</p>
                  <p className='img-fluid'>
                    <img src={cursor} alt='clicks' />
                  </p>
                  <p className='text-black'>Click</p>
                </div>
                <div className='turquoise-bg d-flex flex-column justify-content-end pb-5'>
                  <p className='text-white'>{getImpressions()}</p>
                  <p className='img-fluid'>
                    <img src={magnifier} alt='impressions' />
                  </p>
                  <p className='text-black'>Impressions</p>
                </div>
                <div className='blue-bg d-flex flex-column justify-content-end pb-5'>
                  <p className='text-white'>${getSpent()}</p>
                  <p className='img-fluid'>
                    <img src={currency} alt='spent' />
                  </p>
                  <p className='text-black'>Spent</p>
                </div>
              </div>
            </div>
            <div className='col-lg-5'>
              <h4 className='my-4'>Age Gender</h4>
              <div className='graph-container'>
                <Bar
                  data={data}
                  height={185}
                  options={{
                    legend: {
                      labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                      },
                    },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Clicks',
                          },
                        },
                      ],
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: 'Age Group',
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='leads'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 mb-5'>
              <h4 className='my-4'>Leads</h4>
              {leads.length ? (
                <div className='table-leads-container table-responsive-lg'>
                  <table className='table table-leads table-hover'>
                    <tbody>
                      {leads.map((x) => {
                        const {
                          firstName,
                          lastName,
                          phone,
                          email,
                          comments,
                        } = x
                        return (
                          <tr>
                            <td>
                              <img
                                src={lead_icon}
                                alt=''
                                className='account-img'
                              />
                            </td>
                            <td>
                              <span>{firstName}</span>
                            </td>
                            <td>
                              <span>{lastName}</span>
                            </td>
                            <td>
                              <span>{phone}</span>
                            </td>
                            <td>
                              <span>{email}</span>
                            </td>
                            <td>
                              <span>{comments}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='jumbotron'>No leads yet :(</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
