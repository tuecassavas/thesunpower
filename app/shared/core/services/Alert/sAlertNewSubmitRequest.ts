import axios from 'axios';

export const getContent = (requestId: string, title: string, createdBy: string, newSubmitter: string, numberOfQueue: number = 1) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'New request submitted :partying_face:. \n\n - RequestID: `' + requestId + '` \n - Title: `' + title + '`\n - Created by: `' + createdBy + '`\n - New submitter:  `' + newSubmitter + '` \n - Number of queue: `' + numberOfQueue.toString() + '`'
        }
      }
    ]
  };
};

export const sAlertNewSubmitRequest = async (requestId: string, title: string, createdBy: string, newSubmitter: string, numberOfQueue: number = 1) => {
  if (!process.env.SLACK_WEBHOOK_SUBMIT_REQUEST) {
    return;
  }
  await axios.post(process.env.SLACK_WEBHOOK_SUBMIT_REQUEST, getContent(requestId, title, createdBy, newSubmitter, numberOfQueue));
};
