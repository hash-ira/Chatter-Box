import React from 'react'
import { Grid, Paper, Typography, List, ListItem, ListItemText, Divider, TextField, IconButton , Avatar } from '@mui/material';

function ChatSideSection() {
  return (
    <>
     <Grid item xs={12} lg={3}>
        <div elevation={3} className='h-full'>
          <Typography variant="h6" gutterBottom>
            Chats
          </Typography>
          <Divider />

          {/* Sample List of Chats */}
          <List>
            <ListItem button>
              <ListItemText primary="User 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="User 2" />
            </ListItem>
            {/* Add more chat users as needed */}
          </List>
        </div>
      </Grid> 
    </>
  )
}

export default ChatSideSection
