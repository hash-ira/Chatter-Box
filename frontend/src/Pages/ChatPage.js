import React, { useState } from 'react';
import { Grid} from '@mui/material';
import ChatSection from '../components/ChatSection';
import ChatSideSection from '../components/ChatSideSection';


function ChatPage() {
    const [fetchAgain ,setFetchAgain] = useState(false);
    // const fetchChats = async() => {
    //     const data = await axios.get('/chat');
    //     setChats(data.data);
    // } 

    // useEffect(()=>{
    //     fetchChats();
    // } , []);

    


    return (

    <Grid container className='md:h-[100vh]'>
        <ChatSideSection fetchAgain={fetchAgain}/>
        <ChatSection/>
    </Grid>
    )
}

export default ChatPage;

