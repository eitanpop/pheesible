import React from 'react'
import { useParams } from 'react-router-dom'

import useReport from '../hooks/api/useReport'

import '../styles/reports.css'
import company from '../images/report/company.svg'
import rectangle from '../images/report/rectangle.svg'
import insta from '../images/report/insta.png'
import facebook from '../images/report/facebook.png'
import cursor from '../images/report/cursor.png'
import magnifier from '../images/report/magnifier.png'
import currency from '../images/report/currency.png'
import lead_icon from '../images/report/lead_icon.png'
import table_sample from '../images/report/table_sample.png'

export default () => {
  const { id } = useParams()
  const report = useReport(id)

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
                <p className='text-blue'>1234</p>
                <div className='d-flex flex-column flex-md-row align-items-start'>
                  <img
                    src={rectangle}
                    alt=''
                    className='float-left mr-4 mb-2'
                  />
                  <div>
                    <p className='rating-bold'>Positive Response 100%</p>
                    <p className='rating'>Positive Response 100%</p>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 text-lg-center campaing-info'>
                <p>7 days running Campaign</p>
                <p>
                  <img src={insta} alt='' />
                  <img src={facebook} alt='' />
                  <span>Ads Campaign</span>
                </p>
                <p>
                  <strong>End Date</strong> <br />
                  <span>10-20-2020</span>
                </p>
                <a href='#' className='btn btn-orange'>
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
                  <p className='text-white'>20</p>
                  <p className='img-fluid'>
                    <img src={cursor} alt='clicks' />
                  </p>
                  <p className='text-black'>Click</p>
                </div>
                <div className='turquoise-bg d-flex flex-column justify-content-end pb-5'>
                  <p className='text-white'>20</p>
                  <p className='img-fluid'>
                    <img src={magnifier} alt='impressions' />
                  </p>
                  <p className='text-black'>Impressions</p>
                </div>
                <div className='blue-bg d-flex flex-column justify-content-end pb-5'>
                  <p className='text-white'>$20</p>
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
                <img src={table_sample} alt='' class='img-fluid' />
                <canvas id='myChart' height={250} />
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
              <div className='table-leads-container table-responsive-lg'>
                <table className='table table-leads table-hover'>
                  <tbody>
                    <tr>
                      <td>
                        <img src={lead_icon} alt='' className='account-img' />
                      </td>
                      <td>
                        <span>Joe Doe</span>
                      </td>
                      <td>
                        <span>JoeDoe@email.com</span>
                      </td>
                      <td>
                        <span>Inquires Abcdefg Hijklmno ...</span>
                      </td>
                      <td>
                        <span>10-20-2020</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={lead_icon} alt='' className='account-img' />
                      </td>
                      <td>
                        <span>Joe Doe</span>
                      </td>
                      <td>
                        <span>JoeDoe@email.com</span>
                      </td>
                      <td>
                        <span>Inquires Abcdefg Hijklmno ...</span>
                      </td>
                      <td>
                        <span>10-20-2020</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={lead_icon} alt='' className='account-img' />
                      </td>
                      <td>
                        <span>Joe Doe</span>
                      </td>
                      <td>
                        <span>JoeDoe@email.com</span>
                      </td>
                      <td>
                        <span>Inquires Abcdefg Hijklmno ...</span>
                      </td>
                      <td>
                        <span>10-20-2020</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={lead_icon} alt='' className='account-img' />
                      </td>
                      <td>
                        <span>Joe Doe</span>
                      </td>
                      <td>
                        <span>JoeDoe@email.com</span>
                      </td>
                      <td>
                        <span>Inquires Abcdefg Hijklmno ...</span>
                      </td>
                      <td>
                        <span>10-20-2020</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
