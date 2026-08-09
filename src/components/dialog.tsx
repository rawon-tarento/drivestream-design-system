"use client";

/**
 * L1 Dialog — compatibility aliases for {@link Modal}.
 * Prefer importing from `./modal` for new code
 * (`Modal`, `ModalBody`, size variants).
 */

export {
  Modal as Dialog,
  ModalPortal as DialogPortal,
  ModalOverlay as DialogOverlay,
  ModalTrigger as DialogTrigger,
  ModalClose as DialogClose,
  ModalContent as DialogContent,
  ModalHeader as DialogHeader,
  ModalBody as DialogBody,
  ModalFooter as DialogFooter,
  ModalTitle as DialogTitle,
  ModalDescription as DialogDescription,
  modalContentVariants as dialogContentVariants,
  type ModalContentProps as DialogContentProps,
} from "./modal";
