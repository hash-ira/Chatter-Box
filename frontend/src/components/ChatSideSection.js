import React from 'react'
import { Grid, List, ListItem , Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

function ChatSideSection() {
  return (
    <>
     <Grid item xs={12} lg={3} className='bg-[#F8F9F8]'>
        <div elevation={3} className='flex my-6 px-4 items-center space-x-2 ml-1'>
          <Avatar alt="Remy Sharp" src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png" sx={{ width: 64, height: 64 }} />
          <h2 className='text-[#7095F2] font-medium text-lg'>Anonymous</h2>
        </div>

        <form className="flex items-center bg-white w-5/6 mx-auto rounded-full px-4 py-0.5 h-9">
          <div className="mr-2">
            <PersonSearchIcon className="text-gray-400" />
          </div>
          <input
            className="flex-1 bg-transparent focus:outline-none text-gray-500"
            placeholder="Search Friends"
          />
        </form>


        <div>
          
          {/* Sample List of Chats */}
          <List>
            <ListItem button>
            <div elevation={3} className='flex items-center'>
              <Avatar alt="Remy Sharp" src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png" sx={{ width: 40, height: 40 }} />
              <div className='flex flex-col ml-2'>
                <p className='text-[#7095F2] font-medium text-md'>Anonymous</p>
                <p className='text-slate-600 font-medium text-xs'>Anonymous</p>
              </div>
            </div>
            </ListItem>
            <ListItem button>
            <div elevation={3} className='flex items-center'>
              <Avatar alt="Remy Sharp" src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png" sx={{ width: 40, height: 40 }} />
              <div className='flex flex-col ml-2'>
                <p className='text-[#7095F2] font-medium text-md'>Anonymous</p>
                <p className='text-slate-600 font-medium text-xs'>Anonymous</p>
              </div>
            </div>
            </ListItem>
            <ListItem button>
            <div elevation={3} className='flex items-center'>
              <Avatar alt="Remy Sharp" src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png" sx={{ width: 40, height: 40 }} />
              <div className='flex flex-col ml-2'>
                <p className='text-[#7095F2] font-medium text-md'>Anonymous</p>
                <p className='text-slate-600 font-medium text-xs'>Anonymous</p>
              </div>
            </div>
            </ListItem>
            {/* Add more chat users as needed */}
          </List>
        </div>
      </Grid> 
    </>
  )
}

export default ChatSideSection
