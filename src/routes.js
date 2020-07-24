// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  getChannelsPath: () => [host, prefix, 'channels'].join('/'),
  getChannelPath: (id) => [host, prefix, 'channels', id].join('/'),
  getChannelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
