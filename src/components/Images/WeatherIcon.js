import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon';


const WeatherIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d="M20,15.31,23.31,12,20,8.69V4H15.31L12,.69,8.69,4H4V8.69L.69,12,4,15.31V20H8.69L12,23.31,15.31,20H20ZM12,18a6,6,0,1,1,6-6A6,6,0,0,1,12,18Z" />
        </SvgIcon>
    );
}
export default WeatherIcon