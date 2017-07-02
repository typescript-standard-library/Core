import {Event} from '../../../Core/Events/Event';
import {TransitionEventType} from '../types';


export class TransitionEvent extends Event {
    public static START: TransitionEventType = 'start';
    public static PROGRESS: TransitionEventType = 'progress';
    public static END: TransitionEventType = 'end';
    public static PAUSE: TransitionEventType = 'pause';
    public static STOP: TransitionEventType = 'stop';

    private _value: number;
    private _duration: number;
    private _position: number;
    private _to: number;
    private _from: number;
    private _scale: number;
    private _progress: number;
    private _delta: number;

    /**
     * Value at current point of time.
     */
    public get value(): number {
        return this._value;
    }

    /**
     * Difference of current value compared to previous one.
     */
    public get delta(): number {
        return this._delta;
    }

    /**
     * Transition progress. Value between 0 and 1.
     */
    public get progress(): number {
        return this._progress;
    }

    /**
     * Total duration of transition.
     */
    public get duration(): number {
        return this._duration;
    }

    /**
     * Current time offset of transition.
     */
    public get position(): number {
        return this._position;
    }

    /**
     * Destination value.
     */
    public get to(): number {
        return this._to;
    }

    /**
     * Source value.
     */
    public get from(): number {
        return this._from;
    }

    /**
     * Value returned by timing function. Value around the range of 0 and 1.
     */
    public get scale(): number {
        return this._scale;
    }


    public constructor(
        type: TransitionEventType,
        value: number,
        delta: number,
        progress: number,
        scale: number,
        from: number,
        to: number,
        position: number,
        duration: number
    ) {
        super(type);

        this._value = value;
        this._delta = delta;
        this._progress = progress;
        this._scale = scale;
        this._from = from;
        this._to = to;
        this._position = position;
        this._duration = duration;
    }
}