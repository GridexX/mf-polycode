import { CredentialsManager, fetchApiWithAuth } from './api';

export interface IItem {
  id: string;
  cost: number;
  type: string;
  data: {
    text: string;
  };
}

export async function getItem(id: string, creds: CredentialsManager) {
  return fetchApiWithAuth<{}, IItem>(`/item/${id}`, creds);
}

export async function buyItem(id: string, creds: CredentialsManager) {
  return fetchApiWithAuth<{}, IItem>(`/item/${id}/buy`, creds, 'POST');
}
