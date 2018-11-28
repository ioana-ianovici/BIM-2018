import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { styleConstants } from '../../shared/constants/styleConstants'
import Carousel from '../../shared/Carousel'

const StyledBadgesSection = styled.div`
  .badges-section {
    background-color: ${styleConstants.mainAccent};
    position: relative;
    padding: 35px 120px 25px 120px;
    margin-bottom: 10px;

    @media screen and (max-width: 520px) {
      padding: 35px 60px 25px 60px;
    }
  }

  .badge {
    text-align: center;
  }

  .badge__icon {
    max-width: 40px;
    max-height: 40px;
    display: inline-block;
    margin-right: 10px;
  }

  .badge__text {
    text-align: left;
    display: inline-block;
    vertical-align: super;

    .badge__title {
      font-weight: bold;
      line-height: 18px;
      font-size: 14px;
      color: ${styleConstants.darkThemePrimaryBackground};
    }

    .badge__subtitle,
    .badge__count {
      color: ${styleConstants.darkThemeContrastTextColor};
    }
  }
`

class Badges extends PureComponent {
  render() {
    const items = this.props.items

    return (
      <StyledBadgesSection>
        <section className="badges-section">
          <Carousel
            slidesToShow={5}
            slidesToScroll={1}
            centerMode
            responsive={[
              {
                breakpoint: 1210,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 830,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {items.map((item, i) => (
              <div className="badge" key={i}>
                <img
                  src={item.image}
                  className="badge__icon"
                  alt="article writer"
                />
                <div className="badge__text">
                  <div className="badge__title">{item.title}</div>
                  <div className="badge__subtitle">{item.subtitle}</div>
                  <div className="badge__count">{item.count}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </StyledBadgesSection>
    )
  }
}

Badges.defaultProps = {
  items: [],
}

Badges.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      image: propTypes.string,
      title: propTypes.string,
      subtitle: propTypes.string,
      count: propTypes.number,
    }),
  ),
}

export default Badges
