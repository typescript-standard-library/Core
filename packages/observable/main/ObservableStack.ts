import {Disposable} from '@monument/core/main/Disposable';
import {Cloneable} from '@monument/core/main/Cloneable';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {NullSafeEqualityComparator} from '@monument/core/main/NullSafeEqualityComparator';
import {Enumerable} from '@monument/collections/main/Enumerable';
import {IteratorFunction} from '@monument/collections/main/IteratorFunction';
import {ListStack} from '@monument/collections/main/ListStack';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Event} from '@monument/events/main/Event';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {NotifyCollectionChanged} from './NotifyCollectionChanged';


export class ObservableStack<T> extends ListStack<T> implements Cloneable<ObservableStack<T>>, Disposable, NotifyCollectionChanged<T> {
    private readonly _collectionChanged: ConfigurableEvent<this, CollectionChangedEventArgs> = new ConfigurableEvent(this);


    public get collectionChanged(): Event<this, CollectionChangedEventArgs> {
        return this._collectionChanged;
    }


    public clone(): ObservableStack<T> {
        return new ObservableStack(this);
    }


    public add(item: T): boolean {
        if (super.add(item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public addAll(items: Enumerable<T>): boolean {
        if (super.addAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public remove(item: T): boolean {
        if (super.remove(item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public removeAll(items: Enumerable<T>): boolean {
        if (super.removeAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public retainAll(
        otherItems: Enumerable<T>,
        comparator: EqualityComparator<T> = NullSafeEqualityComparator.instance
    ): boolean {
        if (super.retainAll(otherItems, comparator)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public clear(): boolean {
        if (super.clear()) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public pop(): T {
        const poppedItem: T = super.pop();

        this.onCollectionChanged();

        return poppedItem;
    }


    public dispose(): void {
        this._collectionChanged.dispose();
    }


    protected onCollectionChanged() {
        this._collectionChanged.dispatch(new CollectionChangedEventArgs());
    }
}