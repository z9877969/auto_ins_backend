const fs = require('node:fs/promises');
const path = require('node:path');

class IpnBlackList {
  #IPN_BLACKLIST = [];

  get IPN_BLACKLIST() {
    return this.#IPN_BLACKLIST;
  }

  init = async () => {
    const fileData = await fs.readFile(path.resolve('.ipnblacklist'), 'utf-8');

    const ipnList = fileData.split('\n').filter((el) => el.match(/^[0-9]+$/));

    this.#IPN_BLACKLIST = ipnList;
  };
}

const ipnBlackList = new IpnBlackList();

module.exports = ipnBlackList;
