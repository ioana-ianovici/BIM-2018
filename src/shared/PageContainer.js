import styled from 'styled-components'

const PageWrapper = styled.div`
  height: 100%;
  padding: 0 7%;
  margin: auto;

  @media screen and (max-width: 1000px) {
    padding: 0 5%;
    margin: auto;
  }

  @media screen and (max-width: 700px) {
    padding: 0 2%;
    margin: auto;
  }
`

export default PageWrapper
