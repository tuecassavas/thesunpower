import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rAssignRequest } from 'shared/core/repo/Admin/rAssignRequest';
import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';
import { sCreateNotice } from 'shared/core/services/Notification/sCreateNotice';
import { APPROVE_DESCRIPTION, APPROVE_TITLE, REJECT_DESCRIPTION, REJECT_TITLE } from 'shared/const';

export const sAssignRequest = async (requestId: string, assignTo: string) => {
  await userValidation(assignTo);
  await rAssignRequest(requestId, assignTo);

  const currentRequest = await rGetRequest(requestId);
  if (!currentRequest) {
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
