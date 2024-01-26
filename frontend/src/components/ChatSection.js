import React from 'react'
import { Grid, Typography, Divider, TextField, IconButton , Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
function ChatSection() {
  return (
    <>
      <Grid item xs={12} lg={9}>
        
        <Grid container className="px-3 py-2 items-center">
            <div className = 'flex mt-3 pl-3'> 
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3 className='pl-2 items-left mb-0'>
                    Chat with User 1
                </h3>
            </div>
        </Grid>
        <Divider />

        <div className='flex flex-col h-[80vh]  overflow-y-auto pt-3 px-5'> 
            <div className='self-end text-right'>
                <p className='bg-[#4C7CFF] pl-3 px-2 py-1 text-white rounded-l-lg rounded-tr-lg max-w-sm text-left'>
                You: Hi there!
                </p>
            </div>
            <div className='self-start text-left'>
                <p className='bg-[#e8e7e7] pr-3 px-2 py-1 text-slate-800 rounded-r-lg rounded-tl-lg max-w-sm text-right'>
                User 1: Hello!
                </p>
            </div>
        </div>

        {/* Message Input */}
        <div className='mt-auto'>
            <Grid container>
            <TextField fullWidth variant="outlined" size="medium" placeholder="Type a message" className='flex-1' />
            <IconButton color="primary" size="large">
                <SendIcon />
            </IconButton>
            </Grid>
        </div>
      </Grid>
    </>
  )
}

export default ChatSection
