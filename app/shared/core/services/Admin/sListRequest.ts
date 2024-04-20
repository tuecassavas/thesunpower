import { rGetRequests } from 'shared/core/repo/Requests/rGetRequests';
import { ObjectId } from 'mongodb';
import { REQUEST, REQUEST_STATUS } from 'shared/types/modal';

export const sListAdminRequest = async (pageSize: number, id?: ObjectId, requestId?: string, createdBy?: string, status?: REQUEST_STATUS[]): Promise<REQUEST[]> => {
  const requests = await rGetRequests(pageSize, true, id, undefined, status, requestId, undefined, createdBy);

  return requests.map((request) => ({
    id: request.id,
    tags: request.tags,
    requestId: request.requestId,
    deletedAt: request.deletedAt,
    fee: request.fee,
    feeType: request.feeType,
    createdAt: request.createdAt,
    paid: request.paid,
    title: request.title,
    description: request.description,
    requestQueue: request.requestQueue,
    address: request.address,
    createdBy: request.createdBy,
    isCancel: request.isCancel,
    assignTo: request.assignTo,
    status: request.status,
    contact: request.contact
  }));
};
