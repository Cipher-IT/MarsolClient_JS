export const VerifyOTPResponseStatusEnum = {
    Success: 'SUCCESS',
    Failed: 'FAILED'
} as const;

export type VerifyOTPResponseStatusEnum = (typeof VerifyOTPResponseStatusEnum)[keyof typeof VerifyOTPResponseStatusEnum];