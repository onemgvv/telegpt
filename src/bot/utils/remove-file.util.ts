import { unlink } from 'fs/promises';

export async function removeFile(path: string) {
  try {
    await unlink(path);
  } catch (error: any) {
    console.log('Error while removing file:', error.message);
  }
}
