import { MongoClient } from 'mongodb';
export const MongoHelper = {
  client: null as MongoClient,
  async connect(url): Promise<void> {
    this.client = await MongoClient.connect(url);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  }
};
