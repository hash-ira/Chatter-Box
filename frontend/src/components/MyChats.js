import React from 'react'
import { List, ListItem , Avatar } from '@mui/material';
import { ChatState } from '../context/ChatContext';

function MyChats({chats}) {
  
  const {setSelectedChat} = ChatState();
  return (
    <>
      <List>
              {chats?.map((item, index) => (
                <ListItem key={index} button onClick={() => setSelectedChat(item._id)}>
                  <div elevation={3} className='flex items-center'>
                    <Avatar alt="Remy Sharp" src={item?.users[1]?.profilePicture} sx={{ width: 40, height: 40 }} />
                    <div className='flex flex-col ml-2'>
                      <p className='text-[#7095F2] font-medium text-md'>{item?.users[1]?.name}</p>
                      <p className='text-slate-600 font-medium text-xs'>here goes latest chat</p>
                    </div>
                  </div>
                </ListItem>
              ))}
        </List>
    </>
  )
}

export default MyChats
