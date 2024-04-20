import axios from 'axios';

export const getContent = (phoneNumber: string, name: string, description: string) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'New contact :partying_face:. \n\n - Phone Number: `' + phoneNumber + '` \n - Name: `' + name + '`\n - Description: ```' + description + '```\n'
        }
      }
    ]
  };
};

export const sAlertNewContact = async (phoneNumber: string, name: string, description: string) => {
  if (!process.env.SLACK_WEBHOOK_CUSTOMER_CONTACT) {
    return;
  }
  await axios.post(process.env.SLACK_WEBHOOK_CUSTOMER_CONTACT, getContent(phoneNumber, name, description));
};
