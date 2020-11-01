import React from 'react'

import '../styles/home.css'
import copyright_logo from '../images/home/copyright_logo.png'
import rocket from '../images/home/rocket.png'
import header from '../images/home/header.png'
import table from '../images/home/table.png'

export default () => {
  return (
    <div>
      <div style={{ backgroundColor: 'white' }}>
        <section
          className='intro'
          style={{ backgroundImage: `url(${header})` }}>
          <div className='container-fluid h-100'>
            <div className='row h-100'>
              <div className='col-lg-7  d-flex flex-column justify-content-center align-items-end'>
                <div className='text-white text-center  mb-4 h1'>
                  <strong>Test your idea</strong>
                  <br />
                  and invest safely
                  <br />
                  <br />
                  <a href='javascript:void(Tawk_API.toggle())' className='btn btn-orange px-5'>
                    Ask us
                  </a>
                </div>
              </div>
              <div className='col-lg-5 d-flex flex-column justify-content-center align-items-end'>
                <img src={rocket} alt='rocket' />
              </div>
            </div>
          </div>
        </section>  
        <section className='mt-4'>
          <div className='container'>          
            <div className='row'>
              <div className='col-lg-10 offset-lg-1 text-center overview'>
                <h2 className='mt-4'>What is Pheesible</h2>
                <p className="mt-4">
                  PHEESIBLE is about testing an idea, a prototype, a business
                  venture, or a product QUICKLY. <br />
                  We rapidly want to get the idea to the public and receive
                  feedback to make the step of investing safer.
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex flex-column flex-lg-row mt-5 intro'>
                <div className='p-4'>
                  <h5 className='mb-4'>
                    <strong>Fail Fast</strong>
                  </h5>
                  <p>
                    we want to adopt a mentality of trying an idea quickly and
                    if it fails, let us fail fast. This site is about testing an
                    idea, a prototype, a business venture, or a product QUICKLY
                  </p>
                </div>
                <div className='p-4'>
                  <h5 className='mb-4'>
                    <strong>Quick Test</strong>
                  </h5>
                  <p>
                    Pheesible allows entrepreneurs to quickly and rapidly test
                    ideas and receive feedback from a variety of different
                    sources. With a platform easy to use.
                  </p>
                </div>
                <div className='p-4'>
                  <h5 className='mb-4'>
                    <strong>Professional Material</strong>
                  </h5>
                  <p>
                    We have partnered with various marketing firms to create a
                    beautiful landing page and ad banner geared toward
                    attracting user interaction
                  </p>
                </div>
              </div>
            </div> 
            <div className='row'>
              <div className='col-12 text-center mb-5'>
                {/* <table className='table table-features mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>
                        <div className='bg-table-1 text-white'>Features</div>
                      </th>
                      <th scope='col'>
                        <div className='bg-table-2 text-white'>
                          <img src={pheeseible_ico} alt='' />
                          <span>With Pheesible</span>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='bg-table-2 text-white'>
                          <img src={process_ico} alt='' />
                          <span>Typical Process</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row' className='text-white'>
                        <div className='bg-table-1 border-t'>
                          <h5>LANDING PAGE</h5>
                          <ul>
                            <li>
                              <img src={ico_time1} alt='' /> Time of Creation
                            </li>
                            <li>
                              <img src={ico_curr1} alt='' /> Domain &amp;
                              Hosting Cost
                            </li>
                          </ul>
                        </div>
                      </th>
                      <td>
                        <div className='border-t'>
                          <ul>
                            <li className='txt-orange '>10 minutes</li>
                            <li>
                              <img src={ico_curr3_wh} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className='border-t'>
                          <ul>
                            <li className='txt-gray'>3+ hours to days</li>
                            <li>
                              <img src={currency_ico_bl} alt='' />
                              <img src={currency_ico_bl} alt='' />
                              <img src={currency_ico_bl} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row' className='text-white'>
                        <div className='bg-table-3'>
                          <h5>ADVERTISING</h5>
                          <ul>
                            <li>
                              <img src={ico_time2} alt='' /> Set up and Creation
                            </li>
                            <li>
                              <img src={ico_curr2} alt='' /> Choose your own
                              Budget
                            </li>
                          </ul>
                        </div>
                      </th>
                      <td>
                        <div className='bg-table-5'>
                          <ul>
                            <li className='txt-orange '>3 minutes</li>
                            <li>
                              <img src={ico_curr4_wh} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className='bg-table-5'>
                          <ul>
                            <li className='txt-gray'>30 + minutes</li>
                            <li>
                              <img src={ico_curr5_wh} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row' className='text-white'>
                        <div className='bg-table-4'>
                          <h5>ADDITIONAL FEATURES</h5>
                          <ul>
                            <li>
                              <img src={ico_set} alt='' />
                              Material created by Marketing professionals
                            </li>
                            <li>
                              <img src={ico_set} alt='' />
                              Results from Campaign all in one place
                            </li>
                          </ul>
                        </div>
                      </th>
                      <td>
                        <div className='border-b'>
                          <ul>
                            <li>
                              <img src={ciccle_ico} alt='' />
                            </li>
                            <li>
                              <img src={ciccle_ico} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className='border-b'>
                          <ul>
                            <li>
                              <img src={ico_close} alt='' />
                            </li>
                            <li>
                              <img src={ico_close} alt='' />
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>*/}
                <img className="w-100" src={table} alt='comparison' />
              </div>
            </div>
          </div>
        </section>
        <section className='real-time'>
          <div className='container'>
            <div className='row py-5'>
              <div className='col-lg-6 col-12'>
                <img src='./dist/img/sample.png' alt='' className='img-fluid' />
              </div>
              <div className='col-lg-6 col-12 d-flex flex-column justify-content-center text-white'>
                <h5 className='my-4'>
                  <strong>See your landing page updatiing in real time</strong>
                </h5>
                <p>
                  A entire campaing created by professionals to give you the
                  chance to invest safely in your ideas
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='how-it-works'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 py-5'>
                <h2>How it works</h2>
              </div>
            </div>
            <div className='row pb-lg-5'>
              <div className='col-lg-6 col-12'>
                <h5 className='mb-4'>
                  <strong>Register with Pheesible</strong>
                </h5>
                <p>
                  Start filling out a form describing your product or business
                  idea. This includes a tagline, elevator pitch, features, etc.
                  The point of this form is to be quick, seamless, and painless.
                </p>
              </div>
              <div className='col-lg-6 col-12'>
                <h5 className='mb-4'>
                  <strong>Select a Template and your budget</strong>
                </h5>
                <p>
                  Once you select your template, watch in real time as the page
                  is updated as you fill out the form.
                </p>
                <p>
                  Designate your budget and time period for each focus group and
                  submit. The Pheesible system will publish your ad and landing
                  page to the focus groups you have chosen for the time
                  designated.
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-12'>
                <h5 className='mb-4'>
                  <strong>Lead Generation</strong>
                </h5>
                <p>
                  Lastly, you will receive the information of the users who have
                  signed up so you can contact them once you have materialized
                  your product or business idea.
                </p>
              </div>
              <div className='col-lg-6 col-12'>
                <h5 className='mb-4'>
                  <strong>Results easy to understand</strong>
                </h5>
                <p>
                  Review your results all in one place and easy to understand!
                  Firstly, it will give you the metrics regarding the users who
                  have viewed your page and who signed up. During the landing
                  page creation, you can also decide a minimum sign up rate for
                  the product to be viable. If you have done so, you will
                  receive a “Results review them and you can decide as to
                  whether to continue with the idea or scrap it.{' '}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='examples'>
          <div className='container'>
            <div className='row py-5'>
              <div className='col-md-4 pb-4'>
                <img
                  src='./dist/img/sample_2.png'
                  alt=''
                  className='img-fluid'
                />
              </div>
              <div className='col-md-4 pb-4'>
                <img
                  src='./dist/img/sample_2.png'
                  alt=''
                  className='img-fluid'
                />
              </div>
              <div className='col-md-4 pb-4'>
                <img
                  src='./dist/img/sample_2.png'
                  alt=''
                  className='img-fluid'
                />
              </div>
            </div>
          </div>
        </section>
       
      </div>
      <footer>
        <div className='container'>
          <div className='row text-center'>
            <div className='col-12'>
              <p className='copyright mt-5 mb-4 '>
                <img src={copyright_logo} alt='copyright' /> © Created by Auvul
                Tech Team 2020
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
