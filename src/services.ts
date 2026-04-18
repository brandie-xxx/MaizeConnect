/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Message, Tier } from './types';

export type { User, Message, Tier };

// Mock current user
export const MOCK_USER: User = {
  id: 'user-1',
  email: 'brandxonline.net@gmail.com',
  handle: 'brandiexx.x',
  tier: 'Obsidian',
  streak: 26,
  unreadCount: 3,
  is2FAEnabled: true,
};

// Mock messages
export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    senderHandle: 'elitesec.01',
    recipientHandle: 'brandiexx.x',
    content: 'ENCRYPTED_DATA_01',
    type: 'text',
    encryptionMethod: 'kyber',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'msg-2',
    senderHandle: 'quantum.node',
    recipientHandle: 'brandiexx.x',
    content: 'ENCRYPTED_DATA_02',
    type: 'blueprint',
    blueprintType: 'Security',
    encryptionMethod: 'aes-256',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: 'msg-3',
    senderHandle: 'shadow.ops',
    recipientHandle: 'brandiexx.x',
    content: 'ENCRYPTED_DATA_03',
    type: 'text',
    encryptionMethod: 'kyber',
    status: 'expired',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 31).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Encryption Service (Simulation)
export const EncryptionService = {
  async encrypt(text: string, method: string): Promise<{ content: string; otp: string }> {
    // In a real app, this would use Web Crypto API
    // For this demo, we'll simulate it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return {
      content: `[${method.toUpperCase()}_ENCRYPTED]: ${btoa(text)}`,
      otp
    };
  },

  async decrypt(encryptedContent: string, otp: string): Promise<string> {
    // Simulate decryption check
    if (otp.length !== 6) throw new Error('Invalid OTP');
    
    const base64 = encryptedContent.split(': ')[1];
    try {
      return atob(base64);
    } catch {
      return "Decryption failed. Data corrupted.";
    }
  }
};

// Handle Availability Service
export const HandleService = {
  async checkAvailability(handle: string): Promise<boolean> {
    const takenHandles = ['admin', 'exxcrypt', 'root', 'brandiexx.x'];
    return !takenHandles.includes(handle.toLowerCase());
  }
};
