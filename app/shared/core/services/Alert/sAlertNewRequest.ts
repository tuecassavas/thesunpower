import axios from 'axios';

export const getContent = (requestId: string, title: string, description: string, from: string) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'New request :partying_face:. \n\n - RequestID: ' + requestId + '\n - Title: ' + title + ' \n - Description:```' + description + '``` \n- From: `' + from + '` '
        }
      }
    ]
  };
};

export const sAlertNewRequest = async (requestId: string, title: string, description: string, from: string) => {
  if (!process.env.SLACK_WEBHOOK_NEW_REQUEST) {
    return;
  }
  await axios.post(process.env.SLACK_WEBHOOK_NEW_REQUEST, getContent(requestId, title, description, from));
};
