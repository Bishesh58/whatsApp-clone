import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMessage =(e)=> {
        e.preventDefault();
        console.log("you type", input)
    }



    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at..</p>
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
                <p className={`chat__message ${true && "chat__receiver"}`}>
                <span className="chat__name">Bishesh</span>
                Hey guys, How are you?
                <span className="chat__timestamp">10:12am</span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="Type your message here"/>
                    <button value={input} 
                    onChange={(e)=> setInput(e.target.value)}
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
