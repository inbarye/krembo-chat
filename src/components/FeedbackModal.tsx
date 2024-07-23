import { Modal } from "@mui/material";
import { useState } from "react";

const FeedbackModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'approve' | 'reject' | null>(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {modalAction === 'approve' ? 'Approve Action' : 'Reject Action'}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    You have chosen to {modalAction} the bot's response.
                    (Add your specific logic here)
                </Typography>
                <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default FeedbackModal;
