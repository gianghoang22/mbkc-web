import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { Collapse, IconButton, Stack, TableCell, TableRow } from '@mui/material';
// @mui icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// redux
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { StorePartnerTransform } from '@types';
import { PATH_BRAND_APP } from 'routes/paths';
import OnlyPartnerRow from './OnlyPartnerRow';

interface StorePartnerTableRowProps {
  storePartner: StorePartnerTransform;
  index: number;
}

function StorePartnerTableRow({ index, storePartner }: StorePartnerTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [openList, setOpenList] = useState(-1);

  const handleNavigateDetail = (storeId: number) => {
    navigate(PATH_BRAND_APP.storePartner.root + `/detail/${storeId}`);
    dispatch(setRoutesToBack(pathname));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={100} align="center" onClick={() => handleNavigateDetail(storePartner.storeId)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(storePartner.storeId)}>
          {storePartner.storeName}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(storePartner.storeId)}>
          {storePartner.kitchenCenterName}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => setOpenList(openList === index ? -1 : index)}>
            {openList === index ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TableCell colSpan={7} sx={{ py: 0, pl: 8 }}>
          <Collapse in={openList === index} timeout="auto" unmountOnExit>
            <Stack direction="column">
              {storePartner.listPartner.map((partner) => (
                <OnlyPartnerRow key={partner.partnerName} partner={partner} />
              ))}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default StorePartnerTableRow;
