import React, { Component } from 'react'
import styled from 'styled-components'
import { styleConstants } from '../../shared/styleConstants'
import PageLayout from '../../shared/PageLayout'
import Badges from './Badges'
import UserDetails from './UserDetails'
import Tree from './Tree'
import Requirements from './Requirements'
import messageInABottle from './../../assets/badges/message-in-a-bottle.svg'
import origamiCrane from './../../assets/badges/origami-crane.svg'
import rescueCircle from './../../assets/badges/rescue-circle.svg'
import trumpet from './../../assets/badges/trumpet.svg'
import disk from './../../assets/badges/disk.svg'

const StyledDashboard = styled.div`
  .section-wrapper {
    display: flex;
  }
  .section-left {
    width: 60%;
    margin-right: 20px;
    display: inline-block;
    padding: 18px 20px;
  }

  .section-right {
    width: 40%;
    height: 100%;
    display: inline-block;
    padding: 18px 20px;
    color: ${styleConstants.mainAccent};
  }

  p {
    margin-top: 0;
  }

  .section-right__title {
    margin-top: 0;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-weight: 300;
    line-height: 31px;
    font-size: 21px;
    text-transform: uppercase;
  }

  .section-right__text {
    font-weight: normal;
    line-height: 18px;
    font-size: 14px;
  }

  .section-right__text--inactive {
    color: ${styleConstants.darkThemePaleText};
  }
`

class Dashboard extends Component {
  state = {
    userDetails: {
      userName: 'User name',
      userPicture:
        'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
      userTitle: 'user title',
      userTitleProgressPercentage: 45,
      userLastTitle: 'Rookie',
      userNextTitle: 'Master',
    },
    badges: [
      {
        title: 'Article writer',
        image: messageInABottle,
        subtitle: null,
        count: 1,
      },
      {
        title: 'Article writer',
        image: origamiCrane,
        subtitle: null,
        count: 2,
      },
      { title: 'Article writer', image: disk, subtitle: null, count: 3 },
      {
        title: 'Article writer',
        image: rescueCircle,
        subtitle: null,
        count: 2,
      },
      { title: 'Article writer', image: trumpet, subtitle: null, count: 3 },
      {
        title: 'Article writer',
        image: messageInABottle,
        subtitle: null,
        count: 1,
      },
      {
        title: 'Article writer',
        image: origamiCrane,
        subtitle: null,
        count: 3,
      },
      { title: 'Article writer', image: disk, subtitle: null, count: 3 },
      {
        title: 'Article writer',
        image: rescueCircle,
        subtitle: null,
        count: 2,
      },
      { title: 'Article writer', image: trumpet, subtitle: null, count: 1 },
    ],
    requirements: [
      {
        text:
          'Can create architecture for complex applications based on programming languages on his main area of expertise;',
        isAccomplished: false,
      },
      {
        text:
          'The code he/she writes should be reviewed before going in any production environment, but if there is a critical bug that needs to be fixed as soon as possible he can take the responsibility to push the code to production and the review can come after that;',
        isAccomplished: false,
      },
      {
        text: 'Worked in teams of more than 8 developers;',
        isAccomplished: true,
      },
      {
        text: 'Is able to coordinate teams of 8+ developers;',
        isAccomplished: false,
      },
      {
        text:
          'Has worked with project management methodologies like Waterfall, Agile or Kanban for more than 1 year;',
        isAccomplished: true,
      },
      { text: 'Has full time contract;', isAccomplished: false },
      {
        text:
          'Mentor for SDE I, II, III, helping them in the learning process;',
        isAccomplished: false,
      },
      {
        text:
          'Very good English communication skills in both writing and conversation;',
        isAccomplished: true,
      },
      {
        text:
          'Can communicate effectively with client, set tasks, write emails, hold skype meetings',
        isAccomplished: true,
      },
      {
        text:
          'Contributed to at least one open-source project, can be a project started inside the company;',
        isAccomplished: true,
      },
      {
        text:
          'Has at least one second area of expertise in which he/she feels confident;',
        isAccomplished: false,
      },
      {
        text: 'Is comfortable with both Unix and Windows platforms;',
        isAccomplished: false,
      },
      {
        text:
          'Ability to translate vague business requirements into concrete code, services, or recommendations;',
        isAccomplished: true,
      },
      {
        text:
          'Exposure to software development methodologies, experience in hybrid implementations a plus;',
        isAccomplished: true,
      },
      {
        text: 'Expertise in information security best practices;',
        isAccomplished: true,
      },
      {
        text:
          'Strong grasp of developer best practices with emphasis on practical resolutions to shared challenges;',
        isAccomplished: false,
      },
      {
        text: 'Experience & proficiency in Multi-threaded development;',
        isAccomplished: false,
      },
      { text: 'Responsibilities', isAccomplished: true },
      { text: 'Self-learning', isAccomplished: false },
      {
        text: 'Find solutions for technical challenges inside project;',
        isAccomplished: true,
      },
      {
        text: 'Create the shell at the beginning of projects;',
        isAccomplished: true,
      },
      {
        text: 'Code parts of the app that require his expertise;',
        isAccomplished: false,
      },
      {
        text: 'Review code for critical parts of the project;',
        isAccomplished: true,
      },
      {
        text:
          'Mentor Software Developers helping them in the learning process;',
        isAccomplished: false,
      },
      {
        text:
          'Represent ASSIST in national and international conferences or workshops as speaker;',
        isAccomplished: false,
      },
      {
        text:
          'Help / organize internal, national and international workshops and conferences;',
        isAccomplished: true,
      },
      { text: 'Take part in hiring processes;', isAccomplished: true },
      {
        text:
          'Develop interview tests and participate in the technical interview part;',
        isAccomplished: false,
      },
      {
        text: 'Organize feedback meetings with people he/she is coordinating; ',
        isAccomplished: false,
      },
      {
        text: 'Lead at least one Open Allocation project.',
        isAccomplished: true,
      },
      { text: '3 - 5 years’ experience', isAccomplished: true },
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

  render() {
    const { badges, requirements, userDetails, tree } = this.state

    return (
      <PageLayout>
        <StyledDashboard userProgressPercentage={45}>
          <UserDetails {...userDetails} />
          <Badges items={badges} />
          <div className="section-wrapper">
            <section className="section-left">
              <Tree steps={tree} />
            </section>
            <section className="section-right">
              <Requirements requirements={requirements} />
            </section>
          </div>
        </StyledDashboard>
      </PageLayout>
    )
  }
}

export default Dashboard
