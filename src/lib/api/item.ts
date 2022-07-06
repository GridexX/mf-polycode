import { CredentialsManager, fetchApiWithAuth } from './api';

export interface Item {
  id: string;
  cost: number;
  type: string;
  data: {
    text?: string;
  };
}

export async function getItem(id: string, creds: CredentialsManager) {
  return fetchApiWithAuth<{}, Item>(`/item/${id}`, creds);
}

export async function buyItem(id: string, creds: CredentialsManager) {
  return fetchApiWithAuth<{}, Item>(`/item/${id}/buy`, creds, 'POST');
}
