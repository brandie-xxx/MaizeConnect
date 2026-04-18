/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tier = 'One' | 'Catalyst' | 'Obsidian';

export interface User {
  id: string;
  email: string;
  handle: string;
  tier: Tier;
  streak: number;
  unreadCount: number;
  is2FAEnabled: boolean;
}

export interface Message {
  id: string;
  senderHandle: string;
  recipientHandle: string;
  content: string; // Encrypted
  type: 'text' | 'image' | 'blueprint';
  encryptionMethod: string;
  status: 'unread' | 'read' | 'expired';
  createdAt: string;
  expiresAt: string;
  blueprintType?: 'Business' | 'Security' | 'Investment';
}

export interface EncryptionMethod {
  id: string;
  name: string;
  description: string;
  tiers: Tier[];
}

export const ENCRYPTION_METHODS: EncryptionMethod[] = [
  { id: 'aes-256', name: 'AES-256-GCM', description: 'Standard military-grade encryption.', tiers: ['One', 'Catalyst', 'Obsidian'] },
  { id: 'rsa-4096', name: 'RSA-4096', description: 'Asymmetric encryption for high security.', tiers: ['One', 'Catalyst', 'Obsidian'] },
  { id: 'cha-cha', name: 'ChaCha20-Poly1305', description: 'High-performance stream cipher.', tiers: ['Catalyst', 'Obsidian'] },
  { id: 'el-gamal', name: 'ElGamal', description: 'Discrete logarithm based encryption.', tiers: ['Catalyst', 'Obsidian'] },
  { id: 'kyber', name: 'CRYSTALS-Kyber', description: 'Post-quantum secure encryption.', tiers: ['Catalyst', 'Obsidian'] },
  { id: 'hybrid-v1', name: 'Hybrid V1', description: 'Custom multi-layer encryption.', tiers: ['Obsidian'] },
  { id: 'hybrid-v2', name: 'Hybrid V2 (Quantum)', description: 'Advanced quantum-resistant hybrid.', tiers: ['Obsidian'] },
];

export const TIERS = {
  One: {
    name: 'One',
    price: '$85/month',
    features: ['2 encryption methods', 'OTP via SMS/Email', '30-day retention', 'Push notifications'],
    color: 'text-gray-400',
    bg: 'bg-gray-400/10',
    border: 'border-gray-400/20'
  },
  Catalyst: {
    name: 'Catalyst',
    price: '$350-500/month',
    features: ['8 encryption methods', 'Group messaging', 'Images', 'AI Blueprints', '2FA', 'Priority support'],
    color: 'text-emerald',
    bg: 'bg-emerald/10',
    border: 'border-emerald/20'
  },
  Obsidian: {
    name: 'Obsidian',
    price: '$15,000+/month',
    features: ['14+ encryption methods', 'Custom hybrid encryption', 'Burn after read', 'Self-destruct', 'Dedicated account manager', 'Air-gapped option'],
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20'
  }
};
