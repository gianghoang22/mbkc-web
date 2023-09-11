import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';

interface CreateProductCategoryModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function CreateProductCategoryModal({ isOpen, handleOpen }: CreateProductCategoryModalProps) {
  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <Typography variant="h4">Create Product Category</Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Close
            </Button>

            <Button variant="contained" color="success" type="submit">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default CreateProductCategoryModal;
