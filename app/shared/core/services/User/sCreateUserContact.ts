import { rInsertCustomerContact } from 'shared/core/repo/User/rInsertUserContact';
import { sAlertNewContact } from 'shared/core/services/Alert/sAlertNewCustomerContact';

export const sCreateUserContact = async (phoneNumber: string, fullName: string, description: string) => {
  await rInsertCustomerContact(phoneNumber, fullName, description);
  sAlertNewContact(phoneNumber, fullName, description);
};
