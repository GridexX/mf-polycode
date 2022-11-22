export enum CandidateStatus {
  CONFIRMATION_PENDING = 'CONFIRMATION_PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  TEST_SENT = 'TEST_SENT',
  TEST_OPENED = 'TEST_OPENED',
  TEST_IN_PROGRESS = 'TEST_IN_PROGRESS',
  TEST_FINISHED = 'TEST_FINISHED',
}

export interface Candidate {
  id?: string;
  campainId: string;
  userId: string;
  status: CandidateStatus;
  startedAt: string;
  linkCode: string;
  linkExpiration: string;
}

// No API for this one
