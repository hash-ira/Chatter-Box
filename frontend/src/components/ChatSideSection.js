import React , {useEffect} from 'react'
import { Grid,  Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ChatState } from '../context/ChatContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import MyChats from './MyChats';
import SearchedChats from './SearchedChats';

function ChatSideSection({fetchAgain}) {
  const { user , setChats , chats } = ChatState();
  const [searchValue , setSeachValue] = React.useState("");
  const [searchResults , setSeachResults] = React.useState([]);
  
 
  const fetchChats = async () => {
    if(!user) return;
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      console.log(user);

      const { data } = await axios.get("/api/chat", config);
      setChats(data);  
    }catch(error){
      toast.error("Error occured");
      // console.log(error);
    }
  };

  const getUser = async(searchValue) => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${searchValue}`, config);
      setSeachResults(data);
      console.log(data);  
    }catch(error){
      toast.error("Error occured");
      // console.log(error);
    }
  }

  const handleSearch = (event)=>{
    console.log(event);
    if(event.code === "Enter"  || event.code === "NumpadEnter"){
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        getUser(searchValue);
      }
  }

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [user]);

  
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
            value={searchValue}
            onChange={ (e) => setSeachValue(e.target.value)}
            onKeyDown = {handleSearch}
          />
        </form>


        <div>
          
        {/* <MyChats chats={chats}/> */}
        <SearchedChats chats = {searchResults}/>
        

        </div>
      </Grid> 
    </>
  )
}

export default ChatSideSection
