import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    EditOutlined,
} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { Avatar, Box, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

export default function PostWidget({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const friends = useSelector((state) => state.user.friends);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [newMsg, setNewMsg] = useState("");
    const [openShare, setOpenShare] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const neutralLight = palette.neutral.light;


    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatePost = await response.json();
        dispatch(setPost({ post: updatePost }));
    };

    const handleNewMsg = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postUserId}/${postId}/newMsg`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comments: [...comments, newMsg].reverse() }),
        });
        const data = await response.json();
        dispatch(setPost({ post: data }));
        setNewMsg("")
    };

    console.log(friends);
    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            {!isComments ? <ChatBubbleOutlineOutlined /> : <SpeakerNotesOffIcon color="primary" />}
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <Box>
                    <IconButton onClick={() => setOpenShare(!openShare)}>
                        <ShareOutlined />
                    </IconButton>
                    {openShare && (isNonMobileScreens ? (
                        <Box
                            position="absolute"
                            zIndex="99"
                            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                            marginTop="6px" padding="0.3rem 0.5rem"
                            backgroundColor={neutralLight}
                            borderRadius="7px"
                        >
                            {friends[0] ? (
                                <FlexBetween>
                                    <Avatar />
                                    <Box marginLeft="10px">
                                        100
                                    </Box>
                                </FlexBetween>
                            ) : (
                                <FlexBetween>
                                    <Avatar />
                                    <Box marginLeft="10px">
                                        200
                                    </Box>
                                </FlexBetween>
                            )}
                        </Box>
                    ) : (
                        <Box
                            position="absolute"
                            zIndex="99"
                            right={10}
                            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                            marginTop="6px" padding="0.3rem 0.5rem"
                            backgroundColor={neutralLight}
                            borderRadius="7px"
                        >
                            {friends[0] ? (
                                <FlexBetween>
                                    <Avatar />
                                    <Box marginLeft="10px">
                                        sadffaewrtyuasewrtrt
                                    </Box>
                                </FlexBetween>
                            ) : (
                                <FlexBetween>
                                    <Avatar />
                                    <Box marginLeft="10px">
                                        sadffaewrtyuasewrtrt
                                    </Box>
                                </FlexBetween>
                            )}
                        </Box>
                    )

                    )}
                </Box>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments[0]
                        ? (<>
                            <Box mt="0.5rem" display="flex" justifyContent="center">
                                <FlexBetween
                                    backgroundColor={neutralLight}
                                    width="73%"
                                    borderRadius="9px"
                                    padding="0.1rem 1.5rem"
                                    m="10px"
                                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                >
                                    <InputBase
                                        style={{ width: "97%" }}
                                        onChange={(e) => setNewMsg(e?.target?.value)}
                                        value={newMsg}
                                        type="Search"
                                        placeholder="Add msg..." />
                                    <IconButton
                                        disabled={!newMsg}
                                        title="send msg"
                                        onClick={handleNewMsg} >
                                        <SendIcon />
                                    </IconButton>
                                </FlexBetween>
                            </Box>
                            {comments.map((comment, i) => (
                                <Box key={`${name}-${i}`}>
                                    <Divider />
                                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                        {comment}
                                    </Typography>
                                </Box>
                            ))}
                            <Divider />
                        </>)
                        : (
                            <Box mt="0.5rem" display="flex" justifyContent="center">
                                <FlexBetween
                                    backgroundColor={neutralLight}
                                    width="73%"
                                    borderRadius="9px"
                                    padding="0.1rem 1.5rem"
                                    m="10px"
                                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                >
                                    <InputBase
                                        style={{ width: "97%" }}
                                        onChange={(e) => setNewMsg(e?.target?.value)}
                                        value={newMsg}
                                        type="Search"
                                        placeholder="Add msg..." />
                                    <IconButton
                                        disabled={!newMsg}
                                        title="send msg"
                                        onClick={handleNewMsg} >
                                        <SendIcon />
                                    </IconButton>
                                </FlexBetween>
                            </Box>
                        )}
                </Box>
            )}
        </WidgetWrapper>
    );
}
