const crypto = require('crypto');

module.exports = {
  /**
   * Creates a PBKDF2 + SHA-256 digest of given password and salt
   * @param {String} password
   * @return Promise
   */
  generateHash: (password, salt) => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 24000, 256, 'sha256', (err, key) => {
        if (err) {
          reject(err);
        }

        resolve(key.toString('hex'));
      });
    });
  },

  /**
   * Generates random 32 byte. See crypto documentation for byte length.
   * @return {String} HexPassword
   */
  generateSalt: async () => {
    try {
      let buf = crypto.randomBytes(32);
      return buf.toString('hex');
    } catch (err) {
      throw new Error(err);
    }
  }
};
