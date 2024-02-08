import React from 'react'
import { List, ListItem , Avatar } from '@mui/material';
import { ChatState } from '../context/ChatContext';

function MyChats() {
  
  const {setSelectedChat , user , setChatUser , chats} = ChatState();

  const handleSelectedChat = (item) => {
    console.log(item);
    setSelectedChat(item._id);
    if(user?._id === item?.users[0]._id){
      setChatUser(item?.users[1]);
    } else {
      setChatUser(item?.users[0]);
    }
  }

  console.log(chats);
  return (
    <>
      <List>
              {chats?.map((item, index) => (
                <ListItem key={index} button onClick={() => {handleSelectedChat(item)}}>
                  <div elevation={3} className='flex items-center'>
                    <Avatar alt="Remy Sharp" src={ (user._id === item?.users[0]._id) ? item?.users[1]?.profilePicture : item?.users[0]?.profilePicture  }
                            sx={{ width: 40, height: 40 }} />
                    <div className='flex flex-col ml-2'>
                      <p className='text-[#7095F2] font-medium text-md'>{ (user._id === item?.users[0]._id) ? item?.users[1]?.name : item?.users[0]?.name }</p>
                      <p className='text-slate-400 font-medium text-xs'>{ item?.latestMessage?.sender?._id !== user._id ? `${item?.latestMessage?.sender?.name}: ${item?.latestMessage?.content.substring(0, 40)}` : item?.latestMessage?.content.substring(0, 40) } </p>
                    </div>
                  </div>
                </ListItem>
              ))}
        </List>
    </>
  )
}

export default MyChats;
