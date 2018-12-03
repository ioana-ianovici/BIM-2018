import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-slick'
import iconArrowLeft from './../assets/chevron-left.svg'
import iconArrowRight from './../assets/chevron-right.svg'
import 'slick-carousel/slick/slick.css'

const Wrapper = styled.div`
  /* .slick-dots {
    margin-top: 62px;
    margin-bottom: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    li {
      display: inline-block;
    }
    .slick-active button {
      color: #2699fb;
      background-color: #2699fb;
    }
    button {
      width: 6px;
      height: 6px;
      padding: 0;
      margin: 5px;
      color: #bce0fd;
      background-color: #bce0fd;
      border-radius: 50%;
      border: none;
      overflow: hidden;
    }
  } */

  .slick-prev {
    left: -50px;
    z-index: 0;
  }

  .slick-next {
    right: -50px;
    z-index: 0;
  }

  .slick-next img,
  .slick-prev img {
    height: 12px;
    cursor: pointer;
  }
`

const ButtonArrow = styled.button`
  position: absolute;
  top: ${props => props.arrowsTopDistance || '50%'};
  left: ${props => (props.right ? 'auto' : 0)};
  right: ${props => (props.right ? 0 : 'auto')};
  transform: ${props => (!props.arrowsTopDistance ? 'translateY(-50%)' : '')};
  z-index: 1;
  padding: 5px;
  background-color: transparent;
  border: none;

  img {
    display: block;
    height: 30px;
  }
`
const ArrowLeft = ({ arrowsTopDistance, onClick }) => (
  <ButtonArrow
    onClick={onClick}
    arrowsTopDistance={arrowsTopDistance}
    className="slick-prev"
  >
    {/* todo: add alt */}
    <img src={iconArrowLeft} alt="" />
  </ButtonArrow>
)
ArrowLeft.propTypes = {
  onClick: PropTypes.func,
  arrowsTopDistance: PropTypes.string,
}

const ArrowRight = ({ arrowsTopDistance, onClick }) => (
  <ButtonArrow
    right
    onClick={onClick}
    arrowsTopDistance={arrowsTopDistance}
    className="slick-next"
  >
    {/* todo: add alt */}
    <img src={iconArrowRight} alt="" />
  </ButtonArrow>
)
ArrowRight.propTypes = {
  onClick: PropTypes.func,
  arrowsTopDistance: PropTypes.string,
}

const Carousel = ({
  slidesToShow,
  slidesToScroll,
  totalSlides,
  responsive,
  arrowsTopDistance,
  noArrows,
  children,
}) => (
  <Wrapper>
    <Slider
      infinite={!totalSlides || totalSlides >= slidesToShow}
      speed={500}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      autoplay
      arrows={!noArrows}
      dots={noArrows}
      prevArrow={<ArrowLeft arrowsTopDistance={arrowsTopDistance} />}
      nextArrow={<ArrowRight arrowsTopDistance={arrowsTopDistance} />}
      responsive={responsive}
    >
      {children}
    </Slider>
  </Wrapper>
)

Carousel.propTypes = {
  children: PropTypes.node,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  totalSlides: PropTypes.number,
  responsive: PropTypes.array,
  arrowsTopDistance: PropTypes.string,
  noArrows: PropTypes.bool,
}

export default Carousel
