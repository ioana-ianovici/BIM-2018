import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { styleConstants } from '../../shared/styleConstants'
import Carousel from '../../shared/Carousel'

const StyledBadgesSection = styled.div`
  .badges-section {
    background-color: ${styleConstants.mainAccent};
    position: relative;
    padding: 35px 120px 25px 120px;
    margin-bottom: 10px;
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
    const items = []

    for (let i = 0; i < 10; i++) {
      items.push(
        <div className="badge" key={i}>
          <img
            src="http://www.myiconfinder.com/uploads/iconsets/256-256-815d9b2052180f54807413c1da2b7120-.png"
            className="badge__icon"
            alt="article writer"
          />
          <div className="badge__text">
            <div className="badge__title">Article writer</div>
            <div className="badge__subtitle" />
            <div className="badge__count">11</div>
          </div>
        </div>
      )
    }

    return (
      <StyledBadgesSection>
        <section className="badges-section">
          <Carousel slidesToShow={5} slidesToScroll={1} centerMode>
            {items}
          </Carousel>
        </section>
      </StyledBadgesSection>
    )
  }
}

Badges.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      image: propTypes.string,
      title: propTypes.string,
      subtitle: propTypes.string,
      count: propTypes.number,
    })
  ),
}

export default Badges
