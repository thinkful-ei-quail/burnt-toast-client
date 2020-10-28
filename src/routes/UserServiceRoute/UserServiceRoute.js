import React, { Component } from 'react';
import '../../components/ServiceCard/ServiceCard.css';
import BurntToastService from '../../services/burnt-toast-api-service';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './UserServiceRoute.css'

export class ServiceCardRoute extends Component {
  static defaultProps = {
    match: {
      params: {
        profile_id: 1
      }
    }
  }

  state = {
    user: {},
    userId: 1,
    userServices: []
  };

  componentDidMount() {
    let currentUserId = this.props.match.params.profile_id;
    BurntToastService.getProfile(currentUserId).then(res => {
      this.setState({user: res, userId: currentUserId});
    });
    BurntToastService.getProfileServices(currentUserId).then(res => {
      this.setState({userServices: res});
    });
  }

  render() {
    const serviceList = this.state.userServices.map((service, i) => {
      return (
          <ServiceCard
            key={i}
            image={service.primary_img_url}
            service={service.skill_name}
            category={service.category_name}
            type={service.user_skill_type}
            description={service.primary_description}
          />
      )
    })
    if (this.state.user) {
      return (
      <>
      <section className='profile-info'>
        <img src={this.state.user.profile_img_url ? this.state.user.profile_img_url : 'https://miro.medium.com/max/360/1*W35QUSvGpcLuxPo3SRTH4w.png'} alt='user profile avatar' className='user-profile-photo'></img>
        <div>
          <p>{this.state.user.profile_desc}</p>
          <button type='submit'><a href={`mailto:${this.state.user.email}?subject=Burnt Toast: Inquiry About Your Profile`}>Contact</a></button>
        </div>
      </section>
      <h3 id='user-name-services'>{this.state.user.full_name}'s Services</h3>
      <div className='service-card-list'>
        {serviceList}
      </div>
    </>
    );}
  }
}

export default ServiceCardRoute;

