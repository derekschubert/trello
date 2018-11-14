import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

export default class Icon extends Component {
    render() {
        let {size, icon, maskPosition, backgroundColor, maskSize} = this.props;
        
        return (
            <span className="icon" style={{ 
                backgroundColor,
                WebkitMask: `url(/icons/${icon}.svg) no-repeat ${maskPosition}`,
                mask: `url(/icons/${icon}.svg) no-repeat ${maskPosition}`,
                maskSize: maskSize,
                WebkitMaskSize: maskSize,
                width: size,
                height: size
            }}></span>
        );
    }
}

Icon.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string.isRequired,
    maskSize: PropTypes.string.isRequired,
    maskPosition: PropTypes.string.isRequired    
}

Icon.defaultProps = {
    backgroundColor: "#fff",
    size: "32px"
}