
export interface Message {
    _id: string;
    role: 'user' | 'ai';
    content: string;
    reactComponent?: string;
    createdAt: string;
  }

export interface Conversation {
  _id: string;
  title: string;
}
