import React, { useEffect } from 'react';
import { Grid, Avatar, CircularProgress } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ChatState } from '../context/ChatContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import MyChats from './MyChats';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton} from '@mui/material';
import SearchedChats from './SearchedChats';


function ChatSideSection() {
  const { user, setChats, setChatUser , isChatSelected , myChatsRender } = ChatState();
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [home, setHome] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  
 

  const fetchChats = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (searchValue) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${searchValue}`, config);
      setSearchResults(data);
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      getUser(searchValue);
      setHome(false);
    }
  };

  const handleHomeBtnClick = async () => {
    if (home) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
  
      await axios.delete("/api/chat/", config);
      fetchChats();
      setChatUser({});
      setHome(true);
      
    } catch (error) {
      toast.error("Error occurred while deleting chats");
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    fetchChats();
    setLoading(false);
    // eslint-disable-next-line
  }, [user , home, myChatsRender]);

  return (
    <Grid item xs={12} sm={5} md={4} lg={3} className={` ${ isChatSelected ? 'hidden' : ''} sm:block bg-[#F8F9F8]`}>
      <div elevation={3} className='flex flex-row my-6 px-4 justify-between items-center ml-1'>
        <div className='flex flex-row items-center justify-around'>
          <Avatar alt="Remy Sharp" src={user?.profilePicture} sx={{ width: 64, height: 64 }} />
          <h2 className='text-[#7095F2] font-semibold text-lg ml-2'>{user?.name}</h2>
        </div>
      </div>

      <div className="flex justify-center px-2">
        <form className="flex items-center bg-white w-5/6 mx-auto rounded-full pl-4 py-0.5 h-9">
          <div className="mr-2">
            <PersonSearchIcon className="text-gray-400" />
          </div>
          <input
            className="flex-1 bg-transparent focus:outline-none text-gray-500"
            placeholder="Search Friends"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </form>
          <IconButton onClick={() => handleHomeBtnClick()} className='mr-10'>
            <HomeIcon  className={`text-gray-${home ? "200" : "700"}`}/>
          </IconButton>
      </div>

      
      

      <div>
        <div>
            { home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Home</p>}
            {!home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Search Results</p>}
        </div>
        
        { loading ? (
          <div className="flex justify-center mt-14">
            <CircularProgress color='primary'/>
          </div>
        ) : (
            <>
              {home ? <MyChats/> : <SearchedChats searchResults = {searchResults}/>}
            </>
        )}

      </div>
    </Grid>
  );
}

export default ChatSideSection;
