import React, { Component } from 'react'
import styled from 'styled-components'
import { styleConstants } from '../../shared/styleConstants'
import PageLayout from '../../shared/PageLayout'
import Badges from './Badges'
import UserDetails from './UserDetails'

const StyledDashboard = styled.div`
  .section-wrapper {
    display: flex;
  }
  .section-left {
    width: 60%;
    margin-right: 2%;
    display: inline-block;
  }

  .section-right {
    width: 38%;
    height: 100%;
    display: inline-block;
  }
`

class Dashboard extends Component {
  state = {}
  render() {
    return (
      <PageLayout>
        <StyledDashboard userProgressPercentage={45}>
          <UserDetails />
          <Badges />
          <div className="section-wrapper">
            <section className="section-left">tree</section>
            <section className="section-right">
              <p>
                Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae
                gloriatur ius te, id agam omnis evertitur eum. Affert laboramus
                repudiandae nec et. Inciderint efficiantur his ad. Eum no
                molestiae voluptatibus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae
                gloriatur ius te, id agam omnis evertitur eum. Affert laboramus
                repudiandae nec et. Inciderint efficiantur his ad. Eum no
                molestiae voluptatibus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae
                gloriatur ius te, id agam omnis evertitur eum. Affert laboramus
                repudiandae nec et. Inciderint efficiantur his ad. Eum no
                molestiae voluptatibus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae
                gloriatur ius te, id agam omnis evertitur eum. Affert laboramus
                repudiandae nec et. Inciderint efficiantur his ad. Eum no
                molestiae voluptatibus.
              </p>
            </section>
          </div>
        </StyledDashboard>
      </PageLayout>
    )
  }
}

export default Dashboard
