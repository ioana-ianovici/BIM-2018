import React, { Component } from 'react'
import styled from 'styled-components'
import { API } from 'aws-amplify'

import { styleConstants } from '../../shared/constants/styleConstants'
import { AppConstants } from '../../shared/constants/constants'
import Badges from './Badges'
import UserDetails from './UserDetails'
import Tree from './Tree'
import Requirements from '../../shared/Requirements'

const StyledDashboard = styled.div`
  .section-wrapper {
    display: flex;
  }
  .section-left {
    width: 60%;
    margin-right: 20px;
    padding: 18px 20px;
  }

  .section-right {
    width: 40%;
    height: 100%;
    padding: 18px 20px;
    color: ${styleConstants.mainAccent};
  }

  @media screen and (max-width: 1000px) {
    .section-wrapper {
      flex-wrap: wrap;
    }

    .section-left {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }

    .section-right {
      width: 100%;
    }
  }
`

class Dashboard extends Component {
  state = {
    userDetails: {
      // // userName: 'User name',
      // // userPicture: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
      // userTitle: 'user title',
      // userTitleProgressPercentage: 45,
      // userLastTitle: 'Rookie',
      // userNextTitle: 'Master',
      // userFrame: plant,
    },
    badges: [],
    requirements: [
      {
        id: 1,
        text:
          'Can create architecture for complex applications based on programming languages on his main area of expertise;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'The code he/she writes should be reviewed before going in any production environment, but if there is a critical bug that needs to be fixed as soon as possible he can take the responsibility to push the code to production and the review can come after that;',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Worked in teams of more than 8 developers;',
        isAccomplished: true,
      },
      {
        id: 1,
        text: 'Is able to coordinate teams of 8+ developers;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'Has worked with project management methodologies like Waterfall, Agile or Kanban for more than 1 year;',
        isAccomplished: true,
      },
      { id: 1, text: 'Has full time contract;', isAccomplished: false },
      {
        id: 1,
        text:
          'Mentor for SDE I, II, III, helping them in the learning process;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'Very good English communication skills in both writing and conversation;',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Can communicate effectively with client, set tasks, write emails, hold skype meetings',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Contributed to at least one open-source project, can be a project started inside the company;',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Has at least one second area of expertise in which he/she feels confident;',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Is comfortable with both Unix and Windows platforms;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'Ability to translate vague business requirements into concrete code, services, or recommendations;',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Exposure to software development methodologies, experience in hybrid implementations a plus;',
        isAccomplished: true,
      },
      {
        id: 1,
        text: 'Expertise in information security best practices;',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Strong grasp of developer best practices with emphasis on practical resolutions to shared challenges;',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Experience & proficiency in Multi-threaded development;',
        isAccomplished: false,
      },
      { id: 1, text: 'Responsibilities', isAccomplished: true },
      { id: 1, text: 'Self-learning', isAccomplished: false },
      {
        id: 1,
        text: 'Find solutions for technical challenges inside project;',
        isAccomplished: true,
      },
      {
        id: 1,
        text: 'Create the shell at the beginning of projects;',
        isAccomplished: true,
      },
      {
        id: 1,
        text: 'Code parts of the app that require his expertise;',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Review code for critical parts of the project;',
        isAccomplished: true,
      },
      {
        id: 1,
        text:
          'Mentor Software Developers helping them in the learning process;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'Represent ASSIST in national and international conferences or workshops as speaker;',
        isAccomplished: false,
      },
      {
        id: 1,
        text:
          'Help / organize internal, national and international workshops and conferences;',
        isAccomplished: true,
      },
      { id: 1, text: 'Take part in hiring processes;', isAccomplished: true },
      {
        id: 1,
        text:
          'Develop interview tests and participate in the technical interview part;',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Organize feedback meetings with people he/she is coordinating; ',
        isAccomplished: false,
      },
      {
        id: 1,
        text: 'Lead at least one Open Allocation project.',
        isAccomplished: true,
      },
      { id: 1, text: '3 - 5 years’ experience', isAccomplished: true },
    ],
    tree: [
      {
        title: 'ASSIST Intern',
        isAchieved: true,
      },
      {
        title: 'Software Development Engineer I',
        isAchieved: true,
      },
      {
        title: 'Software Development Engineer II',
        isAchieved: true,
      },
      {
        title: 'Software Development Engineer III',
        isAchieved: true,
      },
      {
        title: 'Senior Software Development Engineer',
        isAchieved: false,
      },
      {
        title: 'Senior Principal Engineer',
        isAchieved: false,
      },
      {
        title: 'Software Development Manager I',
        isAchieved: false,
      },
      {
        title: 'Software Development Manager II',
        isAchieved: false,
      },
    ],
  }

  constructor(props) {
    super(props)

    const getSelf = () => {
      API.get('Self', '', {})
        .then(res => {
          this.setState({
            userDetails: {
              userName: res.userName,
              userPicture: res.picture,
            },
            badgesList: res.badges,
            confirmedRequirements: res.confirmedRequirements,
            titleId: res.title,
            ladderId: res.ladder,
          })

          loadUserData()
        })
        .catch(err => {
          this.props.history.push(AppConstants.routes.settings)
        })
    }

    const loadUserData = () => {
      if (this.state.badgesList && this.state.badgesList.length) {
        let list = this.state.badgesList.toString()

        API.get('Badges', `/${list}`)
          .then(badges => {
            badges.forEach(badge => {
              badge.count = 1
            })

            // todo: remove this.
            badges.forEach(
              (badge, index) =>
                (badge.picture = require(`./../../assets/badges/badge${(index +
                  1) %
                  13}.svg`)),
            )

            this.setState({ badges: badges })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

    if (props.id) {
      // get user details by id.
      // when viewing another user's dashboard
    } else {
      getSelf()
    }
  }

  render() {
    const { badges, requirements, userDetails, tree } = this.state

    return (
      <StyledDashboard userProgressPercentage={45}>
        <UserDetails {...userDetails} />
        {badges && badges.length && <Badges items={badges} />}
        <div className="section-wrapper">
          <section className="section-left">
            <Tree steps={tree} />
          </section>
          <section className="section-right">
            <Requirements requirements={requirements} />
          </section>
        </div>
      </StyledDashboard>
    )
  }
}

export default Dashboard
