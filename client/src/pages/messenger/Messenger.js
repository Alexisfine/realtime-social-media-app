import React, {useContext, useEffect, useRef, useState} from 'react';
import './Messenger.css';
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {io} from 'socket.io-client';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Messenger = () => {
    const [conservations, setConservations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef(io("ws://localhost:8900"));
    const scrollRef = useRef();
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[]);


    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)
        && setMessages(prev=>[...prev, arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers", users=>{
            setOnlineUsers(
                user.following.filter(f=>users.some(u=>u.userId === f)));
        })
    }, [user]);


    useEffect(()=>{
        const getConservations = async () => {
            try {
                const res = await axios.get('/conversations/'+user._id);
                setConservations(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConservations();
    },[user]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    useEffect(()=>{
        const getMessages = async () => {
            try {
                const res = await axios.get('/messages/'+currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    },[currentChat]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId : currentChat._id,
        }

        const receiverId = currentChat.members.find(m => m!==user._id);
        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId,
            text: newMessage
        });

        try {
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Topbar/>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput'/>
                        {conservations.map(conversation=> (
                                <div onClick={()=>setCurrentChat(conversation)}>
                                    <Conversations conversation={conversation} currentUser={user} key={conversation._id}/>
                                </div>

                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currentChat ?
                            (<>
                                <div className='chatBoxTop'>
                                    {messages.map(m=>(
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} key={m._id}/>
                                        </div>
                                    ))}

                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea onChange={(e)=>setNewMessage(e.target.value)}
                                        className='chatMessageInput' placeholder='Write something...'
                                        value={newMessage}></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                </div>
                            </>) : (<span className='noConversation'>Open a conversation to start a chat</span>)}

                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>

            </div>
        </>

    );
};

export default Messenger;