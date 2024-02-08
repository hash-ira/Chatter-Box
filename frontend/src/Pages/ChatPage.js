import React, { useState } from 'react';
import { Grid} from '@mui/material';
import ChatSection from '../components/ChatSection';
import ChatSideSection from '../components/ChatSideSection';
import { ChatState } from '../context/ChatContext';


function ChatPage() {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();
    return (

    <Grid container className='md:h-[100vh]'>
            {user && <ChatSideSection fetchAgain={fetchAgain} /> }
            {user && <ChatSection />} 
    </Grid>
    )
}

export default ChatPage;

