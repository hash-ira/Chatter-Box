import {createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user , setUser] = useState({});
    const [chats , setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo){
            navigate('/');
        }
    } , [navigate]);
    
    
    return (<ChatContext.Provider value = {{user , setUser , chats , setChats}}>
        {children}
    </ChatContext.Provider>);
}

export const ChatState = () => {
    return useContext(ChatContext); 
}

export default ChatProvider;