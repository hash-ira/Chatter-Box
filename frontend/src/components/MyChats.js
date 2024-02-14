import React from 'react'
import { List, ListItem , Avatar } from '@mui/material';
import { ChatState } from '../context/ChatContext';

function MyChats() {
  
  const {setSelectedChat , user , setChatUser , chats , setIsChatSelected} = ChatState();

  const handleSelectedChat = (item) => {
    
    setSelectedChat(item._id);
    if(user?._id === item?.users[0]._id){
      setChatUser(item?.users[1]);
    } else {
      setChatUser(item?.users[0]);
    }
    setIsChatSelected(true);
  }

  const formatDate = (timeStamp) => {
    const messageDate = new Date(timeStamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      <List>
              {chats?.map((item, index) => (
                <ListItem key={index} button onClick={() => {handleSelectedChat(item)}}>
                  <div elevation={3} className='flex w-full justify-between'>
                    <div className='flex items center'>
                      <Avatar alt="Remy Sharp" src={ (user._id === item?.users[0]._id) ? item?.users[1]?.profilePicture : item?.users[0]?.profilePicture  }
                              sx={{ width: 40, height: 40 }} />
                      <div className='flex flex-col ml-2'>
                        <p className='text-[#7095F2] font-medium text-md'>{ (user._id === item?.users[0]._id) ? item?.users[1]?.name : item?.users[0]?.name }</p>
                        <p className='text-slate-400 font-medium text-xs'>
                          {item?.latestMessage?.sender?._id !== user._id ? `${item?.latestMessage?.sender?.name}: ` : ''}
                          {item?.latestMessage?.content.length > 40 ?
                            `${item?.latestMessage?.content.substring(0, 40)}...` :
                            item?.latestMessage?.content
                          }
                        </p>
                      </div>
                    </div>
                    <div className='text-slate-500 font-medium text-xs pt-1'>
                      {formatDate(item?.latestMessage?.createdAt)}
                    </div>
                  </div>
                </ListItem>
              ))}
        </List>
    </>
  )
}

export default MyChats;
