import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../Firebase/firebase';
import { selectUser, userSlice } from './features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([])

    //pull the user to from slice to add messages to db
    const user = useSelector(selectUser)

   

    useEffect(() => {
       if(roomId){
           db.collection("rooms")
           .doc(roomId)
           .onSnapshot((snapshot) =>setRoomName(snapshot.data().name));

           //go inside the messages collection & get the data(messages)
           db.collection("rooms")
           .doc(roomId)
           .collection("messages")
           .orderBy('timestamp','asc')
           .onSnapshot((snapshot)=>(
               setMessages(snapshot.docs.map((doc)=> doc.data()))
           ))
       } 
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage =(e)=> {
        e.preventDefault();
        console.log("You have typed", input)
        setInput("");

        db.collection("rooms")
        .doc(roomId)
        .collection("messages").add({
            message: input,
            name: user.user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    //emojis
    const [emojiPickerState, setEmojiPicker] = useState(false);
    
    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
        <Picker
            onSelect={emoji => setInput(input + " "+ emoji.native)}
            style={{ position: 'absolute', bottom: '61px'}}
            title=""
        />
        );
    }

    const chooseEmoji =(e)=>{
        e.preventDefault();
        setEmojiPicker(!emojiPickerState);
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> Last seen at{" "}
                        {new Date (messages[messages.length - 1]
                        ?.timestamp
                        ?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
    
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                     <p 
                     key={Math.random()*1000}
                     className={`chat__message ${message.name === user.user && "chat__receiver"}`}>
                     <span className="chat__name">
                     {message.name}</span>
                     {message.message}
                     <span className="chat__timestamp">
                     {new Date(message.timestamp?.toDate()).toUTCString()}
                     </span>
                     </p>
                ))}
               
            </div>
            <div className="chat__footer">
                {emojiPicker}
                <InsertEmoticonIcon 
                onClick={chooseEmoji}
                />
                
                <form>
                    <input 
                    value={input} 
                    onChange={(e)=> setInput(e.target.value)}
                    type="text" 
                    placeholder="Type your message here"/>
                    <button 
                    onClick={sendMessage} 
                    type="submit"
                    >
                    Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
