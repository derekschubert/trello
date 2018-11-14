import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './UserIcon.css';

export default class UserIcon extends Component {
    determineStyle = () => {
        let { diameter } = this.props;

        return {
            width: diameter,
            height: diameter,
            lineHeight: diameter
        }
    }

    render() {
        let {href, user} = this.props;

        return (
            <a className="user-icon" href={href} style={this.determineStyle()}>
                {user.initials}
            </a>
        );
    }
}

UserIcon.propTypes = {
    href: PropTypes.string,
    user: PropTypes.object.isRequired,
    diameter: PropTypes.string
};

UserIcon.defaultProps = {
    diameter: "32px"
};