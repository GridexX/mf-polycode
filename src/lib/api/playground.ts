import { CredentialsManager, fetchApiWithAuth } from './api';

export default function runValidator(
  validatorId: string,
  code: string,
  credentialsManager: CredentialsManager
) {
  return fetchApiWithAuth<
    {},
    { success: boolean; stdout: string; stderr: string }
  >(`/validator/${validatorId}`, credentialsManager, 'POST', {
    code,
  });
}
