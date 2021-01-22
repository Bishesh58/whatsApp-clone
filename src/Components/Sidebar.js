import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db, { auth } from '../Firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';



function Sidebar() {

    const [rooms, setrooms] = useState([])
    
    //for signout
    const dispatch = useDispatch()

    //pull the user from store
    const user = useSelector(selectUser)

    useEffect(() => {

      const unsubscribe = db.collection('rooms')
      .onSnapshot((snapshot) =>{
           setrooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
           })))
       })

       return() =>{
           unsubscribe();
       }
    }, [])

    const signOut =()=>{
        dispatch(logout())
        auth.signOut();
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar 
                className="sidebar__headerUser"
                onClick={signOut}
                src={user.photoUrl}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat 
                    key={room.id} 
                    id={room.id} 
                    name={room.data.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
