// @mui
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
//
import { Product } from '@types';
import { Color, Status } from 'common/enum';
import { ContentLabel, ContentSpace, Popover } from 'components';
import { usePopover } from 'hooks/usePopover';

interface ProductDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  product: Product;
}

function ProductDetailModal({ isOpen, handleOpen, product }: ProductDetailModalProps) {
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Product Detail</Typography>

              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack pb={2}>
              <Grid container columnSpacing={3}>
                <Grid item lg={5} md={4} sm={12}>
                  <Box>
                    <img
                      src="/assets/images/kitchen/product.jpg"
                      alt="product"
                      width="100%"
                      style={{ borderRadius: 16 }}
                    />
                  </Box>
                </Grid>
                <Grid item lg={7} md={8} sm={12}>
                  <Stack gap={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">CODE: {product?.code}</Typography>
                      <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>

                    <Box>
                      <Typography variant="h4">{product?.name}</Typography>
                      <Typography variant="body1" textAlign="justify">
                        {product?.description}
                      </Typography>
                    </Box>

                    <ContentSpace divider={false} title="Size" content={product.size} />
                    <ContentSpace title="Category" content={product.categoryId} />
                    <ContentSpace title="Historical Price" content={product.historicalPrice} />
                    <ContentSpace title="Selling Price" content={product.sellingPrice} />
                    <ContentSpace title="Discount Price" content={product.discountPrice} />

                    <ContentLabel title="Type" color={Color.INFO} content={product.type} />
                    <ContentLabel
                      title="Status"
                      color={(product.status === 0 && Color.ERROR) || Color.SUCCESS}
                      content={product.status === 0 ? Status.INACTIVE : Status.ACTIVE}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
        </Dialog>
      )}

      <Popover open={open} handleCloseMenu={handleCloseMenu} />
    </>
  );
}

export default ProductDetailModal;
