'use client';
import ArrowBackOutLinedIcon from '@/assets/CustomIcons/ArrowBackOutLinedIcon';
import ChatMenuIcon from '@/assets/CustomIcons/ChatMenuIcon';
import ChatOptionIcon from '@/assets/CustomIcons/ChatOptionIcon';
import DeleteLightIcon from '@/assets/CustomIcons/DeleteLightIcon';
import SettingOutlinedIcon from '@/assets/CustomIcons/SettingOutlinedIcon';
import SharedFileIcon from '@/assets/CustomIcons/SharedFileIcon';
import VectorChat from '@/assets/CustomIcons/VectorChat';
import VectorVaultChatIcon from '@/assets/CustomIcons/VectorVaultChatIcon';
import VectorVaultChatIconYellow from '@/assets/CustomIcons/VectorVaultChatIconYellow';
import VectorVaultFolderIcon from '@/assets/CustomIcons/VectorVaultFolderIcon';
import HyperParameterModal from '@/components/core/modals/HyperParameterModal';
import { ChatContext } from '@/components/hoc/ChatContext';
import { useDeleteConversation, useGetConversation } from '@/hooks/chat';
import { useDebounce } from '@/hooks/custom';
import {
  useGetHyperParameters,
  useUpdateParameters
} from '@/hooks/hyperParameter';
import { useGetSubscribeProducts } from '@/hooks/marketplace';
import { useGetSharedVaultFolders } from '@/hooks/sharedVault';
import { useGetVectorVaultFolders } from '@/hooks/vectorVaultFolder';
import AddIcon from '@mui/icons-material/Add';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Skeleton,
  Stack,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import usePreviousData from '../../hooks/usePreviousData';
import StyledAuth from '../auth/StyledAuth';
import Conversation from '../chat/Conversation';
import Button from '../core/Button';
import CustomSelect from '../core/CustomSelect';
import CustomSwitchTab from '../core/CustomSwitchTab';
import ResponsiveDrawer from '../core/Drawer';
import ClearChatModal from '../core/modals/ClearChatModal';
import Navbar from '../core/Navbar';
import SearchInput from '../core/SearchInput';
import { CustomTooltip } from '../styled/core';
const SkeletonnCard = () => {
  const style = { borderRadius: '16px', backgroundColor: '#0E2833' };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        py: '1rem',
        gap: '1rem'
      }}
    >
      <Skeleton variant='rounded' width={266} height={50} sx={style} />
      <Skeleton variant='rounded' width={266} height={100} sx={style} />
      <Skeleton variant='rounded' width={266} height={50} sx={style} />
      <Skeleton variant='rounded' width={266} height={100} sx={style} />
      <Skeleton variant='rounded' width={266} height={100} sx={style} />
    </Box>
  );
};
const Drawer = ({ setMobileOpen }) => {
  const isMobileScreen = useMediaQuery('(max-width:425px)');
  const pathname = usePathname();
  const router = useRouter();
  const { folderVaultId, setFolderVaultId } = useContext(ChatContext);
  const { data, isLoading } = useGetConversation(pathname.split('/')[2]);
  const dataArray = data ? data?.conversations : [];
  const ConversationsData = usePreviousData(dataArray);

  const handleNew = () => {
    if (folderVaultId) setFolderVaultId('');
    setMobileOpen(false);
    router.push('/chat');
  };

  return (
    <Stack alignItems={'center'} flex={0.999}>
      <Toolbar />
      <Stack width={'100%'} flex={1} gap='20px'>
        {isMobileScreen ? (
          <FabChatContainer>
            <StyledFabChat
              component={'button'}
              onClick={() => {
                router.push('/chat');
                setMobileOpen(false);
              }}
            >
              <AddIcon
                sx={{
                  color: 'secondaryLight.main',
                  backgroundColor: 'secondaryLight.contrastText',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px'
                }}
              />
            </StyledFabChat>
          </FabChatContainer>
        ) : (
          <Button
            color={'secondary'}
            sx={{
              backgroundColor: 'secondaryLight.main',
              color: 'text.primary',
              borderRadius: '16px',
              justifyContent: 'start',
              padding: '15px',
              gap: '10px',
              textTransform: 'capitalize'
            }}
            onClick={handleNew}
          >
            <AddIcon
              sx={{
                color: 'secondaryLight.main',
                backgroundColor: 'secondaryLight.contrastText',
                borderRadius: '50%',
                width: '20px',
                height: '20px'
              }}
            />

            <Typography variant='body1'>New Chat</Typography>
          </Button>
        )}
        <ConversationWrapper>
          {isLoading ? (
            <SkeletonnCard />
          ) : (
            ConversationsData?.map(({ day, items }, i) => {
              return (
                <Box key={i}>
                  {items.length > 0 && (
                    <Stack
                      sx={{
                        flex: 1,
                        backgroundColor: 'secondaryLight.main',
                        borderRadius: '16px',
                        padding: '0.5rem 0',
                        marginBottom: '1rem'
                      }}
                    >
                      <Typography
                        variant='caption1'
                        sx={{
                          p: '.75rem',
                          color: 'chip.info.color'
                        }}
                      >
                        {day}
                      </Typography>

                      {items?.map(({ title, conv_id, create_ts }) => (
                        <Conversation
                          create_ts={create_ts}
                          id={conv_id}
                          title={title}
                          key={conv_id}
                          setMobileOpen={setMobileOpen}
                          current={pathname.split('/')[2]}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              );
            })
          )}
        </ConversationWrapper>

        <Box sx={{ ml: '-1rem', position: 'relative', marginTop: '6.4rem' }}>
          <StyledAuth.TriangleIcon />
        </Box>
      </Stack>
    </Stack>
  );
};

const ChatLayout = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const isTabletScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobileScreen = useMediaQuery('(max-width:400px)');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [anchorElTwo, setAnchorElTwo] = useState(null);
  const [openTwo, setOpenTwo] = useState(false);
  const [search, setSearch] = useState('');
  const searchString = useDebounce(search, 500);
  const [vaultType, setVaultType] = useState('myVault');
  const [openHyperparameter, setOpenHyperparameter] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);

  const handleClearChatModal = () => setOpenChatModal(false);
  const { data: hyperParametersData } = useGetHyperParameters({
    id: params.id
  });
  const { mutate: deleteConversation } = useDeleteConversation(
    handleClearChatModal,
    true
  );
  const { mutate: updateParameters } = useUpdateParameters({
    id: params?.id
  });
  const handleOpenClearChatModal = () => {
    if (params.id) setOpenChatModal(true);
  };

  useEffect(() => {
    if (isTabletScreen) {
      setisMenuOpen(false);
    } else {
      setisMenuOpen(true);
    }
  }, [isTabletScreen]);
  const toggleMenu = () => setisMenuOpen(!isMenuOpen);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);
  const { slug, setSlug, folderVaultId, setFolderVaultId } =
    useContext(ChatContext);

  const { data, isLoading } = useGetSubscribeProducts({
    search: '',
    cb: setSlug
  });

  //Get VV Folders
  const { data: folders = {} } = useGetVectorVaultFolders({
    page: 1,
    search: searchString,
    offset: 1000,
    cb: setFolderVaultId
  });

  //Get Shared Vault Folders
  const { data: sharedFolders = {} } = useGetSharedVaultFolders({
    page: 1,
    search: searchString,
    offset: 1000
  });
  const result = data?.result?.filter((item) => item.is_active);

  // Transformation Function
  function convertDataToArray(dataObj) {
    const addPropsToObject = (obj, key) => {
      return { id: key, ...obj };
    };
    const dataArray = [];
    for (const [key, value] of Object.entries(dataObj)) {
      const modifiedValue = addPropsToObject(value, key);
      dataArray.push(modifiedValue);
    }
    return dataArray;
  }

  const gotoPrompt = () => {
    router.push(`/chat/promptstudio?id=${params?.id || ''}`);
    setOpenHyperparameter(false);
    setOpen(false);
    setAnchorEl(null);
  };

  const handleOpenHyperparameter = () => {
    setOpenHyperparameter(true);
    setOpen(false);
  };

  const updateVault = useCallback(
    (item) => {
      if (params?.id) updateParameters({ vault_id: !!item ? item.id : '' });
      if (!!item && Object.entries(item).length > 0) {
        setFolderVaultId(item);
      } else {
        setFolderVaultId('');
      }
    },
    [setFolderVaultId, updateParameters, params?.id]
  );

  const updateSlug = useCallback(
    (value) => {
      sessionStorage.setItem('modal', JSON.stringify(value));
      setSlug(value);
    },
    [setSlug]
  );
  // logic for per chat
  useGetHyperParameters({
    id: params?.id,
    isFetched: isLoading,
    callback: (data, isNotExist, newSlug) => {
      if (params.id) {
        if (isNotExist && !!newSlug) updateSlug(newSlug);
        else if (data?.product !== slug && !!params.id && !!data?.product) {
          updateSlug(data?.product);
        }
      }
    }
  });
  const handleCloseHyperparameter = useCallback(() => {
    setOpenHyperparameter(false);
    setAnchorEl(null);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChange = useCallback(
    (event) => {
      const {
        target: { value }
      } = event;
      updateSlug(value);
      if (params?.id) updateParameters({ product: value });
    },
    [updateSlug, params?.id, updateParameters]
  );

  const isEmptyApiData = useMemo(() => {
    const bool = !(
      Object.entries(folders?.folders_data || {}).length > 0 ||
      Object.entries(sharedFolders?.folders_data || {}).length > 0
    );
    return bool;
  }, [folders, sharedFolders]);

  const clearChat = () => {
    if (params.id) deleteConversation({ id: params.id });
  };

  const conVersationVaultId = useMemo(() => {
    const allFolders = convertDataToArray(folders?.folders_data || {});
    const allSharedFolders = convertDataToArray(
      sharedFolders?.folders_data || {}
    );
    const vault = [...allFolders, ...allSharedFolders].find(
      (vault) => vault.id === hyperParametersData?.vault_id
    );

    return params.id ? vault || null : folderVaultId;
  }, [
    folders?.folders_data,
    sharedFolders?.folders_data,
    hyperParametersData?.vault_id,
    folderVaultId,
    params.id
  ]);

  return (
    <>
      <Navbar mobileOpen={mobileOpen} setMobileOpen={toggleDrawer} isChat>
        <Stack
          flex={1}
          direction={'row'}
          justifyContent={'flex-end'}
          spacing={'1rem'}
        >
          <CustomSelect
            list={result?.map((product) => ({
              name: product.title,
              value: product.slug,
              disabled: !product.is_active,
              logo: product.logo
            }))}
            color={'secondary'}
            value={slug || ''}
            onChange={handleChange}
            renderValue
            isLoading={isLoading}
            width={isMobileScreen ? '100%' : 'fit-content'}
            sx={{
              borderRadius: '6px',
              minWidth: 160,
              [theme.breakpoints.up('sm')]: {
                minWidth: 200
              },
              [theme.breakpoints.down('sm')]: {
                maxWidth: 150,
                marginLeft: 'auto'
              }
            }}
            maxHeight={'18rem'}
          />
        </Stack>
      </Navbar>
      <div>
        <div className='d-flex'>
          <ResponsiveDrawer
            isChat={true}
            mobileOpen={mobileOpen}
            setMobileOpen={toggleDrawer}
          >
            <Drawer setMobileOpen={setMobileOpen} />
          </ResponsiveDrawer>
          <Stack
            sx={{
              width: '100%',
              maxHeight: 'calc(100vh - 72px)',
              overflowX: 'hidden',
              overflowY: 'hidden'
            }}
          >
            {children}
          </Stack>
        </div>
        {!pathname.includes('promptstudio') && (
          <>
            <FabMenuContainer>
              <StyledFab
                component={'button'}
                onClick={toggleMenu}
                sx={{
                  backgroundColor: isMenuOpen && 'background.paper',
                  padding: '1.125rem 0.5rem '
                }}
              >
                <ChatMenuIcon />
              </StyledFab>
            </FabMenuContainer>
            {isMenuOpen && (
              <FabContainer istabletscreen={`${isTabletScreen}`}>
                <CustomTooltip
                  title={'Hyperparameters'}
                  placement='left'
                  color={theme.palette.background.paper}
                  tooltippadding={'0.5rem 1rem'}
                >
                  <StyledFab
                    component={'button'}
                    onClick={handleOpenHyperparameter}
                  >
                    <ToolTipTypography>
                      <ChatOptionIcon />
                    </ToolTipTypography>
                  </StyledFab>
                </CustomTooltip>
                <CustomTooltip
                  title={'Prompt Studio'}
                  placement='left'
                  color={theme.palette.background.paper}
                  tooltippadding={'0.5rem 1rem'}
                >
                  <StyledFab component={'button'} onClick={gotoPrompt}>
                    <ToolTipTypography>
                      <VectorChat />
                    </ToolTipTypography>
                  </StyledFab>
                </CustomTooltip>
                <CustomTooltip
                  title={'Vector Vault'}
                  placement='left'
                  color={theme.palette.background.paper}
                  tooltippadding={'0.5rem 1rem'}
                >
                  <StyledFab
                    component={'button'}
                    onClick={(e) => {
                      setAnchorElTwo(e.currentTarget);
                      setOpenTwo(true);
                    }}
                  >
                    <ToolTipTypography>
                      {!!conVersationVaultId ? (
                        <VectorVaultChatIconYellow />
                      ) : (
                        <VectorVaultChatIcon />
                      )}
                    </ToolTipTypography>
                  </StyledFab>
                </CustomTooltip>
                <CustomTooltip
                  title={'Clear'}
                  placement='left'
                  color={theme.palette.background.paper}
                  tooltippadding={'0.5rem 1rem'}
                >
                  <StyledFab
                    component={'button'}
                    onClick={() => handleOpenClearChatModal()}
                  >
                    <ToolTipTypography>
                      <DeleteLightIcon />
                    </ToolTipTypography>
                  </StyledFab>
                </CustomTooltip>
              </FabContainer>
            )}
            <ClearChatModal
              clearChat={clearChat}
              open={openChatModal}
              handleClose={handleClearChatModal}
            />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                '.MuiPopover-paper': {
                  background:
                    'linear-gradient(180deg, rgba(14, 40, 51, 0.50) 0%, rgba(39, 93, 113, 0.00) 100%), #0E2833',
                  borderRadius: '10px'
                }
              }}
            >
              <Stack sx={{ width: 250 }}>
                <PopoverLayout>
                  <Stack
                    direction={'row'}
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Typography
                      variant={'caption1'}
                      color={theme.palette.background.paper}
                    >
                      Select Settings
                    </Typography>
                    <Stack
                      onClick={handleClose}
                      justifyContent={'center'}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ArrowBackOutLinedIcon />
                    </Stack>
                  </Stack>
                </PopoverLayout>
                <MenuList>
                  <MenuItem onClick={handleOpenHyperparameter}>
                    <ListItemIcon>
                      <SettingOutlinedIcon />
                    </ListItemIcon>
                    <Typography variant={'body2'}>Hyperparameters</Typography>
                  </MenuItem>
                </MenuList>
              </Stack>
            </Popover>

            {/* Vector Vault Popover */}
            <Popover
              open={openTwo}
              anchorEl={anchorElTwo}
              onClose={() => setOpenTwo(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                '.MuiPopover-paper': {
                  background:
                    'linear-gradient(180deg, rgba(14, 40, 51, 0.50) 0%, rgba(39, 93, 113, 0.00) 100%), #0E2833',
                  borderRadius: '10px'
                }
              }}
            >
              <Stack className='MainStack' gap='1rem' sx={{ width: 250 }}>
                <PopoverLayout>
                  <MainTextBox>
                    <TextBoxContainer>
                      <VectorVaultFolderIcon />
                      <Typography
                        variant={'body2'}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {!!conVersationVaultId?.name
                          ? conVersationVaultId?.name
                          : 'No Vault'}
                      </Typography>
                      <IconButton
                        sx={{
                          marginLeft: 'auto',
                          visibility: `${
                            !!conVersationVaultId?.name ? 'visible' : 'hidden'
                          }}`
                        }}
                        size='small'
                        onClick={() => updateVault('')}
                      >
                        <CancelSharpIcon fontSize='inherit' />
                      </IconButton>
                    </TextBoxContainer>
                  </MainTextBox>
                  {/* Toggle Switch */}
                  <CustomSwitchTab
                    vaultType={vaultType}
                    setVaultType={setVaultType}
                  />
                  {/* Search */}
                  <InputWrapper>
                    <SearchInput
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </InputWrapper>

                  {/* MenuItems */}
                  {!isEmptyApiData ? (
                    <Stack
                      className='MainMenuItemsStack'
                      gap='1rem'
                      padding='0px'
                      height='auto'
                      maxHeight='167px'
                      overflow='auto'
                    >
                      {vaultType === 'myVault'
                        ? convertDataToArray(folders?.folders_data || {})?.map(
                            (item, index) => {
                              return (
                                <Box key={index}>
                                  <MenuItem
                                    onClick={() => updateVault(item)}
                                    sx={{
                                      padding: '0px 4px',
                                      minHeight: '40px'
                                    }}
                                  >
                                    <Stack
                                      gap='1rem'
                                      padding='0px'
                                      direction='row'
                                      alignItems='center'
                                      textAlign='center'
                                    >
                                      {!!item?.shared_by ||
                                      item?.shared === true ? (
                                        <SharedFileIcon />
                                      ) : (
                                        <VectorVaultFolderIcon />
                                      )}
                                      <Typography
                                        variant={'body2'}
                                        sx={{
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}
                                      >
                                        {item?.name}
                                      </Typography>
                                    </Stack>
                                  </MenuItem>
                                </Box>
                              );
                            }
                          )
                        : convertDataToArray(
                            sharedFolders?.folders_data || {}
                          )?.map((item, index) => {
                            return (
                              <Box key={index}>
                                <MenuItem
                                  onClick={() => updateVault(item)}
                                  sx={{ padding: '0px 4px', minHeight: '40px' }}
                                >
                                  <Stack
                                    gap='1rem'
                                    padding='0px'
                                    direction='row'
                                    alignItems='center'
                                    textAlign='center'
                                  >
                                    <SharedFileIcon />
                                    <Typography
                                      variant={'body2'}
                                      sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                      }}
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Stack>
                                </MenuItem>
                              </Box>
                            );
                          })}
                    </Stack>
                  ) : (
                    ''
                  )}
                </PopoverLayout>
              </Stack>
            </Popover>
            <HyperParameterModal
              open={openHyperparameter}
              anchorEl={anchorEl}
              handleClose={handleCloseHyperparameter}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ChatLayout;

const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const ConversationWrapper = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 285px)',
  [theme.breakpoints.down('md')]: {
    height: 'calc(100vh - 160px)'
  },
  overflow: 'auto'
}));

const StyledFab = styled(Box)(({ theme }) => ({
  padding: '0.5rem',
  background: theme.palette.secondaryLight.main,
  display: 'flex',
  border: 'none',
  borderRadius: '8px',
  color: theme.palette.text.primary,
  cursor: 'pointer'
}));
const FabMenuContainer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: 100,
  right: 25,
  gap: '1rem',
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    right: 16,
    top: 80
  }
}));
const FabContainer = styled(Stack)(({ istabletscreen, theme }) => ({
  position: 'absolute',
  top: istabletscreen === 'true' ? 150 : 100,
  right: 25,
  [theme.breakpoints.down('md')]: {
    right: 16
  },
  gap: '1rem'
}));
const FabChatContainer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  bottom: 20,
  right: 25,
  gap: '1rem'
}));
const StyledFabChat = styled(Box)(({ theme }) => ({
  padding: '1rem',
  background:
    'linear-gradient(270deg, rgba(227, 158, 54, 0.70) -58%, #275D71 89.33%)',
  display: 'flex',
  border: 'none',
  borderRadius: '10px',
  color: theme.palette.text.primary,
  cursor: 'pointer'
}));
const PopoverLayout = styled(Stack)(({ theme }) => ({
  padding: '0.6rem 0.69rem',
  gap: '1rem'
}));

const MainTextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '5px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(191, 191, 191, 0.125)',
  borderRadius: '8px'
}));

const TextBoxContainer = styled(Box)(({ theme }) => ({
  gap: '1rem',
  display: 'flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  paddingLeft: '0px'
}));

const ToolTipTypography = styled(Typography)(({ theme }) => ({
  lineHeight: '0.6rem',
  [theme.breakpoints.down('md')]: {
    lineHeight: '0.5rem'
  }
}));
