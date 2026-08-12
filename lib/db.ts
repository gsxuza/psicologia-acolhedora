import { neon } from '@neondatabase/serverless';

let _client: ReturnType<typeof neon> | null = null;

function getClient() {
  if (!_client) {
    _client = neon(process.env.DATABASE_URL!);
  }
  return _client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sql(strings: TemplateStringsArray, ...values: any[]): Promise<any[]> {
  return getClient()(strings, ...values) as Promise<any[]>;
}
