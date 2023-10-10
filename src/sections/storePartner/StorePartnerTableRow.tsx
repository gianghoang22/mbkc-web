import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
// @mui
import { Collapse, IconButton, Stack, TableCell, TableRow, AvatarGroup, Avatar } from '@mui/material';
// @mui icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { PATH_BRAND_APP } from 'routes/paths';
import OnlyPartnerRow from './OnlyPartnerRow';
import { Store } from '@types';
import { getAllStorePartnersByStoreId } from 'redux/storePartner/storePartnerSlice';
import OnlyPartnerRowSkeleton from './OnlyPartnerRowSkeleton';

interface StorePartnerTableRowProps {
  store: Store;
  index: number;
}

function StorePartnerTableRow({ index, store }: StorePartnerTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { storePartners, isLoading } = useAppSelector((state) => state.storePartner);
  console.log(storePartners);
  const [openList, setOpenList] = useState(-1);

  const handleNavigateDetail = (storeId: number) => {
    navigate(PATH_BRAND_APP.store.root + `/detail/${storeId}`);
    dispatch(setRoutesToBack(pathname));
  };

  const params = useMemo(() => {
    return {
      storeId: store.storeId,
      navigate,
    };
  }, [store.storeId, navigate]);

  useEffect(() => {
    dispatch(getAllStorePartnersByStoreId(params));
  }, [dispatch, navigate, params]);

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={120} align="center" onClick={() => handleNavigateDetail(store.storeId)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" padding="none" onClick={() => handleNavigateDetail(store.storeId)}>
          {store.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {store.kitchenCenter.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          <AvatarGroup max={4} sx={{ justifyContent: 'left' }}>
            {storePartners?.storePartners.map((partner) => (
              <Avatar key={partner.partnerName} alt={partner.partnerName} src={partner.partnerLogo} />
            ))}
          </AvatarGroup>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => setOpenList(openList === index ? -1 : index)}>
            {openList === index ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TableCell colSpan={7} sx={{ py: 0, pl: 7 }}>
          <Collapse in={openList === index} timeout="auto" unmountOnExit>
            {isLoading ? (
              <Stack direction="column">
                <OnlyPartnerRowSkeleton />
              </Stack>
            ) : (
              <Stack direction="column">
                {storePartners?.storePartners.map((partner) => (
                  <OnlyPartnerRow key={partner.partnerName} partner={partner} storeId={store.storeId} />
                ))}
              </Stack>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default StorePartnerTableRow;
