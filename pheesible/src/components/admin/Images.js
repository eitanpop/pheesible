import React, { useState } from 'react'

import useImageEffect from '../../hooks/useImageEffect'

export default ({ promotion }) => {
  const [ad, setAd] = useState()
  const [logo, setLogo] = useState()
  const [banner, setBanner] = useState()
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  useImageEffect(promotion.ad.image, promotion.identityId, setAd)
  useImageEffect(promotion.fields.logo, promotion.identityId, setLogo)
  useImageEffect(promotion.fields.banner, promotion.identityId, setBanner)
  useImageEffect(promotion.images.imageOne, promotion.identityId, setImageOne)
  useImageEffect(promotion.images.imageTwo, promotion.identityId, setImageTwo)
  useImageEffect(
    promotion.images.imageThree,
    promotion.identityId,
    setImageThree
  )
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-3'>Logo</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={logo} alt='logo' />
        </div>
      </div>
      <hr width='90%' />
      <div className='row'>
        <div className='col-sm-3'>Banner</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={banner} alt='banner' />
        </div>
      </div>
      <hr width='90%' />
      <div className='row'>
        <div className='col-sm-3'>Image One</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={imageOne} alt='imageOne' />
        </div>
      </div>
      <hr width='90%' />
      <div className='row '>
        <div className='col-sm-3'>Image Two</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={imageTwo} alt='imageTwo' />
        </div>
      </div>
      <hr width='90%' />
      <div className='row '>
        <div className='col-sm-3'>Image Three</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={imageThree} alt='imageThree' />
        </div>
      </div>
      <hr width='90%' />
      <div className='row '>
        <div className='col-sm-3'>AD</div>
        <div className='col-sm-9'>
          <img className='admin-image' src={ad} alt='ad' />
        </div>
      </div>
    </div>
  )
}
