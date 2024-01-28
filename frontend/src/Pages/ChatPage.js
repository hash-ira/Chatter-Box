import React from 'react';
import { Grid} from '@mui/material';
import ChatSection from '../components/ChatSection';
import ChatSideSection from '../components/ChatSideSection';


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
        <ChatSideSection/>
        <ChatSection/>
    </Grid>
    )
}

export default ChatPage;

