import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // In order to change values on the state reducer
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Accessing colors from a file theme
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setSearchData(data);
  };

  useEffect(() => {
    getPosts();
  }, [])


  const foundUser = (val) => {
    if (!val) {
      setFilterData([]);
    } else {
      const newFilter = searchData.filter((item) => item.firstName.includes(val) || item.lastName.includes(val));
      setFilterData(newFilter.length > 0 ? newFilter : [{ firstName: "User not found" }]);
    }
  }
  const SelectUserSearch = (val) => {
    navigate(`/profile/${val._id}`);
    navigate(0);
  }
  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "primaryLight",
              cursor: "pointer",
            },
          }}
        >
          Social-Network
        </Typography>
        {isNonMobileScreens && (
          <Box>
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="0.5rem"
              padding="0.1rem 1.2rem"
            >
              <InputBase type="Search" placeholder="Search User..."
                onChange={(e) =>
                  foundUser(e.target.value)
                }
              />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
            {filterData[0] &&
              <div
                style={{
                  position: "absolute", zIndex: "9999", backgroundColor: neutralLight, borderRadius: "9px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginTop: "1px", padding: "0.3rem 0"
                }} >
                {filterData[0].firstName === "User not found" ? (
                  <>
                    {filterData.map((item, i) =>
                      <MenuItem key={i} >
                        <Typography>
                        <FlexBetween justifyContent='space-between'>
                            <Avatar/>
                            <Box marginLeft="10px">
                              {item.firstName}
                            </Box>
                          </FlexBetween>
                        </Typography>
                      </MenuItem>
                    )}
                  </>
                ) : (
                  <>
                    {filterData.map((item, i) =>
                      <MenuItem key={i} onClick={() => SelectUserSearch(item)}>
                        <Typography>
                          <FlexBetween justifyContent='space-between'>
                            <UserImage image={item.picturePath} size="40px" />
                            <Box marginLeft="10px">
                              {item.firstName + ' ' + item.lastName}
                            </Box>
                          </FlexBetween>
                        </Typography>
                      </MenuItem>
                    )}
                  </>
                )}
              </div>
            }
          </Box>
        )}
      </FlexBetween>

      {/*  DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .Mui-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem onClick={() => navigate(`/profile/${_id}`)} value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <Box>
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="0.5rem"
              padding="0.1rem 1.2rem"
            >
              <InputBase type="Search" placeholder="Search User..."
                onChange={(e) =>
                  foundUser(e.target.value)
                }
              />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
            {filterData[0] &&
              <div
                style={{
                  position: "absolute", zIndex: "9999", backgroundColor: neutralLight, borderRadius: "9px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginTop: "1px", padding: "0.3rem 0"
                }} >
                {filterData[0].firstName === "User not found" ? (
                  <>
                    {filterData.map((item, i) =>
                      <MenuItem key={i} >
                        <Typography>
                        <FlexBetween justifyContent='space-between'>
                            <Avatar/>
                            <Box marginLeft="10px">
                              {item.firstName}
                            </Box>
                          </FlexBetween>
                        </Typography>
                      </MenuItem>
                    )}
                  </>
                ) : (
                  <>
                    {filterData.map((item, i) =>
                      <MenuItem key={i} onClick={() => SelectUserSearch(item)}>
                        <Typography>
                          <FlexBetween justifyContent='space-between'>
                            <UserImage image={item.picturePath} size="40px" />
                            <Box marginLeft="10px">
                              {item.firstName + ' ' + item.lastName}
                            </Box>
                          </FlexBetween>
                        </Typography>
                      </MenuItem>
                    )}
                  </>
                )}
              </div>
            }
          </Box>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem onClick={() => navigate(`/profile/${_id}`)} value={fullName}>
                  <Typography >{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}
