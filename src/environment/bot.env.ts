export const TOKEN = process.env.TOKEN || '';
export const OWNER = Number(process.env.OWNER);
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PROD = NODE_ENV === 'prod';

export const FILE_DW_LINK = process.env.FILE_DW_LINK;
export const EXPRESS_PORT = process.env.EXPRESS_PORT;
