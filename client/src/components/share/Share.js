import React, {useContext, useRef, useState} from 'react';
import './Share.css';
import {Cancel, EmojiEmotions, Label, PermMedia, Room} from "@material-ui/icons";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Share = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: desc.current.value,
        }

        if (file) {
            const data = new FormData();
            // const fileName = Date.now() + file.name;
            data.append('file', file);
            // data.append('name', fileName);
            newPost.img = file.name;

            try {
                await axios.post('/upload',data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (err) {

        }
    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img src={user.profilePicture
                        ? PF + user.profilePicture
                        : PF + 'person/noAvatar.png'} alt='' className='shareProfileImg'/>
                    <input type='text' placeholder={'Share your life ' + user.username + '!'} ref={desc} className='shareInput'/>
                </div>
                <hr className='shareHr'/>
                {file && (
                    <div className='shareImgContainer'>
                        <img className='shareImg' src={URL.createObjectURL(file)} alt=''/>
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className='shareBottom' onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia className='shareIcon' htmlColor='tomato'/>
                            <span className='shareOptionText'>Photo or Video</span>
                            <input type='file' id='file' accept='.png,.jpeg,.jpg' style={{display:'none'}}
                                   onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className='shareOption'>
                            <Label className='shareIcon' htmlColor='blue'/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room className='shareIcon' htmlColor='green'/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions className='shareIcon' htmlColor='goldenrod'/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>

            </div>
        </div>
    );
};

export default Share;