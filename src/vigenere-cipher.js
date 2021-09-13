import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
export default class VigenereCipheringMachine {
  constructor(direction = true) {
    this.abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.isReverse = !direction;
		this.mode = '';
  }

  checkArguments(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
  }

	crypt(message, key) {
		this.checkArguments(message, key);

    const maxLength = Math.max(message.length, key.length);
    let result = '';

    for (let i = 0; i < maxLength; i++) {
      let messageIndex = this.abc.indexOf(message[i >= message.length ? i % message.length : i]);
      let keysIndex = key[i >= key.length ? i % key.length : i];

			let ki = (this.mode.indexOf('gronsfeld') !== -1) ? parseInt( keysIndex ): this.abc.indexOf( keysIndex );

			ki = ( (this.mode.indexOf('decrypt') !== -1) ? (-ki) : ki );
			let code = this.abc[ ( ( ( this.abc.length + ( messageIndex + ki ) ) % this.abc.length ) ) ];
			code = (this.mode === 'shifted_atbash') ? this.abc[this.abc.length -1 - this.abc.indexOf(code)] : code;
			result += code;	
    }

		return result;
	}

  encrypt(message, key) {
		this.mode = 'encrypt';
    this.crypt(message, key);
  }

  decrypt(message, key) {
    this.mode = 'decrypt';
    return this.crypt(message, key);
  }
}
