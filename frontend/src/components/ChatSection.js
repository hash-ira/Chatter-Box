import React, { useEffect } from 'react'
import { Grid, Divider, TextField, IconButton , Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function ChatSection() {

  const {user , selectedChat , chatUser} = ChatState();
  const [messages , setMessages] = React.useState([]);
  const [newMessage , setNewMessage] = React.useState("");

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log("hyena" , selectedChat);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat}`,
        config
      );
      console.log("data" , data);
      setMessages(data);

    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {

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
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Error ocurred!");
      }
    }
  };

  // console.log();

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  } , [selectedChat]);

  console.log("messages" , messages);

  return (
    <>
      <Grid item xs={12} lg={9}>
        
        <Grid container className="px-3 py-2">
            <div className = 'flex mt-3 pl-3 items-center'> 
                <Avatar alt="Remy Sharp" src={chatUser.profilePicture} sx={{ width: 48, height: 48 }}/>
                <h3 className='pl-2 items-left mb-0 text-lg font-bold'>
                    {chatUser.name}
                </h3>
            </div>
        </Grid>
        <Divider />

        <div className='flex flex-col h-[80vh]  overflow-y-auto pt-3 px-5'> 
          { messages?.map((item , index) => {
            if(item.sender._id === user._id){
              return (
                <div key={index} className='self-end text-right mb-2'>
                    <p className='bg-[#4C7CFF] pl-3 px-2 py-1 text-white rounded-l-lg rounded-tr-lg max-w-sm text-left'>
                    {item.content}
                    </p>
                </div>
              );
            }else{

                return (
                  <div key={index} className='self-start text-left mb-2'>
                    <p className='bg-[#e8e7e7] pr-3 px-2 py-1 text-slate-800 rounded-r-lg rounded-tl-lg max-w-sm text-right'>
                      {item.content}
                    </p>
                  </div>
                );
            }
          })}    
        </div>

        {/* Message Input */}
        <div className='mt-auto'>
            <Grid container>
            <TextField fullWidth variant="outlined" size="medium" placeholder="Type a message" className='flex-1' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={sendMessage}/>
            <IconButton color="primary" size="large">
                <SendIcon />
            </IconButton>
            </Grid>
        </div>
      </Grid>
    </>
  )
}

export default ChatSection
