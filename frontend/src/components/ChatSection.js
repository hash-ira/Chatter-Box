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
import DateSeparator from './DateSeparator';
import Lottie from "react-lottie";
import animationData from "../animation/typing.json";

const END_POINT = "http://localhost:4000";

// eslint-disable-next-line
var socket , selectedChatCompare;

function ChatSection() {

  const { user, selectedChat, chatUser, setMessageSent, isChatSelected, setIsChatSelected , setSelectedChat, setChatUser , setUser , setChats , setMyChatsRender } = ChatState();
  // eslint-disable-next-line
  const [lastDate, setLastDate] = React.useState(null);
  const [messages , setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [socketConnected, setSocketConnected] = React.useState(false);
  const navigate = useNavigate();


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo");
    setSelectedChat("");
    setChatUser({});
    setUser({});
    setChats([]);
    setIsChatSelected(false);
    setMessageSent(false);
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
      socket.emit("stop typing", selectedChat);
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
        setMyChatsRender( prev => !prev);
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
    socket.on("typing" , () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));
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
    if (isTyping || messages.length > 0) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isTyping, messages]);
  

  
  useEffect(() => {
    if (messages.length > 0) {
        const lastMessageDate = new Date(messages[messages.length - 1].createdAt);
        setLastDate(lastMessageDate);
    }
  }, [messages]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat);
        setTyping(false);
      }
    }, timerLength);
  };
  
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
              const messageDate = new Date(item.createdAt);
              const isFirstMessage = index === 0 || messageDate.toDateString() !== new Date(messages[index - 1].createdAt).toDateString();


              return (
                <React.Fragment key={index}>
                  {isFirstMessage && <DateSeparator messageDate={messageDate} />}
                  <div key={index} className={`mb-2 ${isSentByCurrentUser ? 'self-end text-right bg-[#4C7CFF] rounded-l-lg rounded-tr-lg ' : 'self-start text-left bg-[#e8e7e7] rounded-r-lg rounded-tl-lg '}`}>
                    <p className={`px-2 pt-1 max-w-sm text-left ${isSentByCurrentUser ? 'text-white' : 'text-slate-800'}`}>
                      {item.content}
                    </p>
                    <p className={`${isSentByCurrentUser ? 'text-slate-300' : 'text-slate-800' } text-[9px]  text-right pb-0.5 pr-0.5`} >{messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' , hour12: false})}</p>
                  </div>
                </React.Fragment>
              );
            })
          )}
          { isTyping && <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div> }
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className='mt-auto px-3'>
            <Grid container>
              <TextField fullWidth variant="outlined" size="medium" placeholder="Type a message" className='flex-1' value={newMessage} onChange={handleTyping} onKeyDown={(e) => {if (e.key === "Enter") { sendMessage(e) }}}/>
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
