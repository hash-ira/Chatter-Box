import React from 'react';
import { List, ListItem , Avatar } from '@mui/material';

function SearchedChats({chats}) {

  return (
    <>
      <List>
              {chats?.map((item, index) => (
                <ListItem key={index} button>
                  <div elevation={3} className='flex items-center'>
                    <Avatar alt="Remy Sharp" src={item?.profilePicture} sx={{ width: 40, height: 40 }} />
                    <div className='flex flex-col ml-2'>
                      <p className='text-[#7095F2] font-medium text-md'>{item?.name}</p>
                      <p className='text-slate-600 font-medium text-xs'>here goes latest chat</p>
                    </div>
                  </div>
                </ListItem>
              ))}
        </List>
    </>
  )
}

export default SearchedChats
