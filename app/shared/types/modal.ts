export type VERIFY = {
  id: string;
  updatedAt: Date;
  username: string;
  numberOfSendOTP: number;
  numberOfSubmitOTP: number;
  otp: string;
  type: 'VERIFY' | 'FORGOT';
};
