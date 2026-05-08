import { Dialog } from '../../../shared/components/Dialog';
export function ConfirmDialog({ open, onConfirm, onClose }: { open: boolean; onConfirm: () => void; onClose: () => void }) { return <Dialog open={open} title="확인" onClose={onClose}><button className="button danger" onClick={onConfirm}>삭제</button></Dialog>; }
