import {createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState("");
    const [chatUser, setChatUser] = useState({});
    const [user , setUser] = useState({});
    const [chats, setChats] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) navigate('/');
    } , [navigate]);
    
    
    return (<ChatContext.Provider value = {{user , setUser ,
                                            chats , setChats ,
                                            selectedChat, setSelectedChat,
                                            chatUser , setChatUser,
                                            messageSent , setMessageSent}}>
        {children}
    </ChatContext.Provider>);
}

export const ChatState = () => {
    return useContext(ChatContext); 
}

export default ChatProvider;