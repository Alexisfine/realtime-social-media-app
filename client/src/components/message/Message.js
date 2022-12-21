import React from 'react';
import './Message.css';
import {format} from 'timeago.js';

const Message = ({message, own}) => {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <img src='https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=1600'
                     alt='' className='messageImg'/>
                <p className='messageText'>{message.text}</p>
            </div>
            <div className='messageBottom'>
                {format(message.createdAt)}
            </div>
        </div>
    );
};

export default Message;