import { rCreateNotice } from 'shared/core/repo/Notification/rCreateNotice';

export const sCreateNotice = async (title: string, description: string, username: string | null): Promise<void> => {
  await rCreateNotice(title, description, username);
};
