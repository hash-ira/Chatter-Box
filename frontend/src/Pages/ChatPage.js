import React , {useEffect , useState} from 'react';
import axios from 'axios';


function ChatPage() {
    const [chats ,steChats] = useState([]);
    const fetchChats = async() => {
        const data = await axios.get('/chat');
        steChats(data.data);
    }

    useEffect(()=>{
        fetchChats();
    } , []);


    return (
        <div>
            <h1>ChatPage</h1>
            <div>{chats.map( chat => <p key={chat._id}>{chat.chatName}</p>)}</div>
        </div>
    )
}

export default ChatPage
