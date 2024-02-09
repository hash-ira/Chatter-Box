import React from 'react';
import { Grid} from '@mui/material';
import ChatSection from '../components/ChatSection';
import ChatSideSection from '../components/ChatSideSection';
import { ChatState } from '../context/ChatContext';


function ChatPage() {
    const { user } = ChatState();
    
    return (

        <Grid container className='h-[100vh]'>
            {user && <ChatSideSection /> }
            {user && <ChatSection/>} 
    </Grid>
    )
}

export default ChatPage;

