import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {KeyValuePair} from '@monument/core/main/collection/KeyValuePair';
import {EqualityComparator} from 'packages/core/main/utils/comparison/EqualityComparator';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {Map} from '@monument/core/main/collection/mutable/Map';


export abstract class MapSpec {
    private map!: Map<string, string>;


    public abstract create(
        items?: Iterable<KeyValuePair<string, string>>,
        keyComparator?: EqualityComparator<string>,
        valueComparator?: EqualityComparator<string>
    ): Map<string, string>;


    @BeforeEach
    public setup(comparator: IgnoreCaseComparator) {
        this.map = this.create(
            [
                new KeyValuePair('One', 'ONE'),
                new KeyValuePair('Two', 'TWO'),
                new KeyValuePair('three', 'Three'),
                new KeyValuePair('Three', 'THREE')
            ],
            comparator,
            comparator
        );
    }


    @Test
    public 'constructor() creates new instance of Map'(assert: Assert, comparator: IgnoreCaseComparator) {
        assert.equals(this.map.length, 3);
        assert.equals(this.map.keyComparator, comparator);
        assert.equals(this.map.valueComparator, comparator);
        assert.identical(this.map.keys.toArray(), ['One', 'Two', 'Three']);
        assert.identical(this.map.values.toArray(), ['ONE', 'TWO', 'THREE']);
    }


    @Test
    public 'put() creates new key-value pair'(assert: Assert) {
        this.map.put('four', 'FOUR');

        assert.equals(this.map.length, 4);
    }


    @Test
    public 'put() overwrites key-value pair with same key'(assert: Assert) {
        this.map.put('TWO', 'two');

        assert.equals(this.map.length, 3);
    }


    @Test
    public 'get() returns value with key matching equality comparator'(assert: Assert) {
        assert.equals(this.map.get('ONE'), 'ONE');
        assert.equals(this.map.get('TWO'), 'TWO');
        assert.equals(this.map.get('THREE'), 'THREE');
    }


    @Test
    public 'get() returns fallback value if did not found any'(assert: Assert) {
        assert.equals(this.map.get('FOUR', 'FOUR'), 'FOUR');
    }


    @Test
    public 'containsKey() determines whether map contains pair with specified key'(assert: Assert) {
        assert.true(this.map.containsKey('ONE'));
        assert.false(this.map.containsKey('Four'));
    }


    @Test
    public 'containsValue() determines whether map contains pair with specified value'(assert: Assert) {
        assert.true(this.map.containsValue('ONE'));
        assert.false(this.map.containsValue('Four'));
    }


    @Test
    public 'remove() removes key-value pair by key matching equality comparator'(assert: Assert) {
        assert.equals(this.map.remove('one'), 'ONE');
        assert.equals(this.map.length, 2);
        assert.equals(this.map.remove('two'), 'TWO');
        assert.equals(this.map.length, 1);
        assert.equals(this.map.remove('three'), 'THREE');
        assert.equals(this.map.length, 0);
    }


    @Test
    public 'clear() removes all key-value pairs from map'(assert: Assert) {
        assert.equals(this.map.length, 3);

        this.map.clear();

        assert.equals(this.map.length, 0);
    }
}
