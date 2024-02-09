import React, { useEffect  , useRef} from 'react'
import { Grid, Divider, TextField, IconButton, Avatar, CircularProgress, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const END_POINT = "http://localhost:4000";

// eslint-disable-next-line
var socket , selectedChatCompare;

function ChatSection() {

  const {user , selectedChat , chatUser , setMessageSent , isChatSelected , setIsChatSelected} = ChatState();
  const [messages , setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [socketConnected, setSocketConnected] = React.useState(false);
  
  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo");
    navigate('/');
  }

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat}`,
        config
      );
      setMessages(data);

      socket.emit("joinChat" , selectedChat);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addUserToMyChats = async () => {
    const id = await chatUser?._id;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      await axios.post(
        "/api/chat",
        {
          userId: id,
        },
        config
      );
    } catch (error) {
      console.log("error courred");
      toast.error("Error ocurred!");
    }
  }

  const sendMessage = async (event) => {
    if (newMessage) {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit("newMessage", data);
        if(messages.length === 0){
          await addUserToMyChats();
        }
        setMessageSent(true);
        setMessages(prevMessages => [...prevMessages, data]);
      } catch (error) {
        toast.error("Error ocurred!");
      }
    }
  };

  useEffect(()=>{
    socket = io(END_POINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  } , [selectedChat]);

  useEffect(() => {
    socket.on("messageReceived", (newMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    });
  
    return () => {
      socket.off("messageReceived");
    };
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Grid item xs={12} sm={7} md={8} lg={9} className={` ${ isChatSelected ? '' : 'hidden'} sm:block`}>
        
        <Grid container className="px-2 py-2">
          <div className='flex justify-between w-full items-center'>
            <div className='flex mt-3 pl-1 items-center'>
              <div className={` ${ isChatSelected ? '' : 'block'} sm:hidden`}>
                <IconButton onClick={() => setIsChatSelected(false)}> 
                  <ArrowBackIcon/>
                </IconButton>
                </div>
                <Avatar alt="Remy Sharp" src={chatUser?.profilePicture} sx={{ width: 48, height: 48 }}/>
                <h3 className='pl-2 items-left mb-0 text-lg font-bold text-[#7095F2]'>
                    {chatUser?.name || "Select a user to chat"}
                </h3>
            </div>
            <div>
              <Button variant="contained" endIcon={<LogoutIcon />} size="small" onClick={logoutHandler} style={{ backgroundColor: '#6788db', color: '#FFFFFF' }}>
                Logout
              </Button>
            </div>
            </div>
        </Grid>
        <Divider />

        <div className='flex flex-col h-[80vh] overflow-y-auto pt-3 px-5'>
          {loading ? (
            <div className="flex justify-center my-auto">
              <CircularProgress color="primary" />
            </div>
          ) : (
            messages?.map((item, index) => {
              const isSentByCurrentUser = item.sender._id === user._id;
              return (
                <div key={index} className={`mb-2 ${isSentByCurrentUser ? 'self-end text-right' : 'self-start text-left'}`}>
                  <p className={`px-2 py-1 max-w-sm text-left ${isSentByCurrentUser ? 'bg-[#4C7CFF] rounded-l-lg rounded-tr-lg text-white' : 'bg-[#e8e7e7] rounded-r-lg rounded-tl-lg text-slate-800'}`}>
                    {item.content}
                  </p>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className='mt-auto px-3'>
            <Grid container>
              <TextField fullWidth variant="outlined" size="medium" placeholder="Type a message" className='flex-1' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") { sendMessage(e) }}}/>
              <IconButton color="primary" size="large" onClick={sendMessage}>
                  <SendIcon />
              </IconButton>

            </Grid>
        </div>
      </Grid>
    </>
  )
}

export default ChatSection
