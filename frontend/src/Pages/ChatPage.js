import React , {useEffect , useState} from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Divider, TextField, IconButton , Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function ChatPage() {
    // const [chats ,setChats] = useState([]);
    // const fetchChats = async() => {
    //     const data = await axios.get('/chat');
    //     setChats(data.data);
    // }

    // useEffect(()=>{
    //     fetchChats();
    // } , []);


    return (

    <Grid container className='md:h-[100vh]'>
      {/* Left Sidebar - List of Chats */}
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
      {/* Main Chat Area */}
      <Grid item xs={12} lg={9}>
        <div className='h-[100vh] '>
            <Grid container className="px-3 py-2 items-center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Typography variant="h6" gutterBottom className='pl-2 items-left'>
                    Chat with User 1
                </Typography>
            </Grid>
            <Divider />

          {/* Chat Messages */}
          <div style={{ height: '60vh', overflowY: 'auto', marginTop: '10px' }}>
            {/* Sample Chat Messages */}
            <div>
              <Typography variant="subtitle2" gutterBottom>
                User 1: Hello!
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                You: Hi there!
              </Typography>
            </div>
            {/* Add more chat messages as needed */}
          </div>

          {/* Message Input */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              <TextField fullWidth variant="outlined" placeholder="Type a message" />
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              <IconButton color="primary" size="large">
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
    )
}

export default ChatPage;

