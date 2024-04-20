import { rApproveRequest } from 'shared/core/repo/Admin/rApproveRequest';

export const sApproveRequest = async (requestId: string) => {
  await rApproveRequest(requestId);
};
