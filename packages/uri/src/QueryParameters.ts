import {
    BooleanParser,
    FloatParser,
    IntParser,
    LinkedMultiValueMap,
    PreserveCaseEqualityComparator,
    Queryable,
    ReadOnlyList
} from '@monument/core';
import {ReadOnlyQueryParameters} from './ReadOnlyQueryParameters';

const PARAMETERS_DELIMITER = '&';
const KEY_VALUE_DELIMITER = '=';
const KEY_VALUE_PAIR_LENGTH = 2;
const KEY_COMPONENT_INDEX = 0;
const VALUE_COMPONENT_INDEX = 1;


/**
 * @since 0.0.1
 * @author Alex Chugaev
 * @final
 */
export class QueryParameters extends LinkedMultiValueMap<string, string> implements ReadOnlyQueryParameters {
    public constructor();
    public constructor(source: string);
    public constructor(source?: string) {
        super(PreserveCaseEqualityComparator.get(), PreserveCaseEqualityComparator.get());

        if (source != null) {
            const pairs: string[] = source.split(PARAMETERS_DELIMITER);

            for (const pair of pairs) {
                const parts: string[] = pair.split(KEY_VALUE_DELIMITER);

                if (parts.length === KEY_VALUE_PAIR_LENGTH) {
                    const name: string = decodeURIComponent(parts[KEY_COMPONENT_INDEX]);
                    const value: string = decodeURIComponent(parts[VALUE_COMPONENT_INDEX]);

                    this.put(name, value);
                }
            }
        }
    }

    public getBoolean(key: string): boolean | undefined;
    public getBoolean(key: string, defaultValue: boolean): boolean;
    public getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
        const value: string | undefined = this.getString(key);

        if (value != null) {
            return BooleanParser.WEAK.parse(value);
        }

        return defaultValue;
    }

    public getFloat(key: string): number | undefined;
    public getFloat(key: string, defaultValue: number): number;
    public getFloat(key: string, defaultValue?: number): number | undefined {
        const value: string | undefined = this.getFirst(key);

        if (value != null) {
            return FloatParser.WEAK.parse(value);
        }

        return defaultValue;
    }

    public getFloats(key: string): Queryable<number> {
        const slot = this.obtainSlot(key);

        return slot.map((actualItem) => {
            return FloatParser.WEAK.parse(actualItem);
        });
    }

    public getInteger(key: string): number | undefined;
    public getInteger(key: string, defaultValue: number): number;
    public getInteger(key: string, defaultValue?: number): number | undefined {
        const value: string | undefined = this.getFirst(key);

        if (value != null) {
            return IntParser.WEAK.parse(value);
        }

        return defaultValue;
    }

    public getIntegers(key: string): Queryable<number> {
        const slot = this.obtainSlot(key);

        return slot.map((actualItem) => {
            return FloatParser.WEAK.parse(actualItem);
        });
    }

    public getString(key: string): string | undefined;
    public getString(key: string, defaultValue: string): string;
    public getString(key: string, defaultValue?: string): string | undefined {
        const values: ReadOnlyList<string> = this.get(key);

        if (values.length > 0) {
            return values.getAt(0);
        }

        return defaultValue;
    }

    public getStrings(key: string): Queryable<string> {
        return this.get(key);
    }
}
