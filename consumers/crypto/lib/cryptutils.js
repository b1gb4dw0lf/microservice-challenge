const crypto = require('crypto');
const hash = crypto.createHash('sha256');


class CryptUtils {

  /**
   * Creates hash of given password with random 16 byte salt
   * @return {String}
   */
  static async createHash(password) => {
    try {
      let salt = await this.generateSalt();
      let passwordDigest = await this.generateHash(password, salt);
      return passwordDigest.toString('hex');
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Creates a SHA-256 digest of given password and salt
   * @param {String} password
   * @return {String}
   */
  static async generateHash(password, salt) => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 24000, 256, 'sha256', (err, key) => {
        if (err) {
          reject(err);
        }

        resolve(key.toString('hex'));
      });
    });
  }

  /**
   * Generates random 32 byte. See crypto documentation for byte length.
   * @return {String} HexPassword
   */
  static async generateSalt() => {
    try {
      let buf = crypto.randomBytes(32);
      return buf.toString('hex');
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Compares given hash and the password with the salt combined.
   * @return {Boolean}
   */
  static async compareHash(hash, password, salt) => {
    let generatedHash = await this.generateHash(password, salt);
    return hash === generatedHash;
  }

}
