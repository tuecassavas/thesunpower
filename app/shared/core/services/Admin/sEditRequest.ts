import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { REQUEST_FEE_TYPE, REQUEST_STATUS } from 'shared/types/modal';
import { rEditRequest } from 'shared/core/repo/Admin/rEditRequest';
import { removeUndefinedFields } from 'shared/helpers';
import { sCreateNotice } from 'shared/core/services/Notification/sCreateNotice';
import { APPROVE_DESCRIPTION, APPROVE_TITLE, REJECT_DESCRIPTION, REJECT_TITLE } from 'shared/const';

export const sEditRequest = async (requestId: string, title?: string, description?: string, address?: string, contact?: string, feeType?: REQUEST_FEE_TYPE, fee?: string, paid?: string, tags?: string[], status?: REQUEST_STATUS, assignTo?: string): Promise<void> => {
  const currentRequest = await rGetRequest(requestId);

  if (!currentRequest) {
    throw new LogError(ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
  }

  const updateData: { [key: string]: string | undefined | string[] } = {
    title,
    description,
    contact,
    address,
    fee,
    feeType,
    paid,
    tags,
    status,
    assignTo
  };

  const newData = removeUndefinedFields(updateData);

  await rEditRequest(requestId, newData);

  if (status || status !== 'ASSIGN') {
    return;
  }

  if (!assignTo) {
    return;
  }

  await sCreateNotice(APPROVE_TITLE, APPROVE_DESCRIPTION(requestId), assignTo);

  if (currentRequest.requestQueue && currentRequest.requestQueue.length === 0) {
    return;
  }

  currentRequest.requestQueue?.map(async (username) => {
    if (username !== assignTo) {
      await sCreateNotice(REJECT_TITLE, REJECT_DESCRIPTION(requestId), username);
    }
  });
};
