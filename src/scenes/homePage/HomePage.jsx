import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar/Navbar'
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
export default function HomePage() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Box 
      position="fixed" zIndex='999' width="100%" 
      >
        <Navbar />
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box marginTop="3.5rem" flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "46%" : undefined}
          mt={isNonMobileScreen ? "3.5rem" : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <Box
          // maxHeight="500px"
          // minHeight="300px"
          // border = "1px solid black"
          // overflow='auto'
          >
            <PostsWidget userId={{ _id }} />
          </Box>
        </Box>
        {isNonMobileScreen && (<Box flexBasis="26%" marginTop="3.5rem">
          <AdvertWidget />
          <Box m='2rem 0' />
          <FriendListWidget userId={_id} />
        </Box>)}
      </Box>
    </Box>
  )
}
