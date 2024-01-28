import React , {useEffect} from 'react'
import { Grid, List, ListItem , Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ChatState } from '../context/ChatContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function ChatSideSection() {
  const { user , setChats , chats } = ChatState();

  const fetchChats = async () => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };


      const { data } = await axios.get("/api/chat", config);
      setChats(data);  
    }catch(error){
      toast.error("Error occured");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [0]);

  console.log(chats);

  return (
    <>
     <Grid item xs={12} lg={3} className='bg-[#F8F9F8]'>
        <div elevation={3} className='flex my-6 px-4 items-center space-x-2 ml-1'>
          <Avatar alt="Remy Sharp" src={user?.profilePicture} sx={{ width: 64, height: 64 }} />
          <h2 className='text-[#7095F2] font-medium text-lg'>{user?.name}</h2>
        </div>

        <form className="flex items-center bg-white w-5/6 mx-auto rounded-full px-4 py-0.5 h-9">
          <div className="mr-2">
            <PersonSearchIcon className="text-gray-400" />
          </div>
          <input
            className="flex-1 bg-transparent focus:outline-none text-gray-500"
            placeholder="Search Friends"
          />
        </form>


        <div>
          
          {/* Sample List of Chats */}
          <List>
              {chats.map((item, index) => (
                <ListItem key={index} button>
                  <div elevation={3} className='flex items-center'>
                    <Avatar alt="Remy Sharp" src={item?.users[1]?.profilePicture} sx={{ width: 40, height: 40 }} />
                    <div className='flex flex-col ml-2'>
                      <p className='text-[#7095F2] font-medium text-md'>{item?.users[1]?.name}</p>
                      <p className='text-slate-600 font-medium text-xs'>here goes latest chat</p>
                    </div>
                  </div>
                </ListItem>
              ))}
          </List>
        </div>
      </Grid> 
    </>
  )
}

export default ChatSideSection
