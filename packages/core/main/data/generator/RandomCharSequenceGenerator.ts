import {CharSequenceGenerator} from './CharSequenceGenerator';
import {StringPool} from '../../StringPool';
import {Assert} from '../../assert/Assert';
import {RandomNumberGenerator} from './RandomNumberGenerator';


export class RandomCharSequenceGenerator implements CharSequenceGenerator {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';


    public generate(length: number, charset: string): string {
        Assert.argument('length', length).isLength();
        Assert.argument('charset', charset).notEmptyString();

        let value: string = StringPool.BLANK;

        for (let i = 0; i < length; i++) {
            let characterIndex: number = RandomNumberGenerator.getInteger(0, charset.length);

            value += charset[characterIndex];
        }

        return value;
    }
}