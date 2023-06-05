import { BehaviorSubject, Observable, distinctUntilChanged, of, switchMap } from "rxjs";

/**
 * A store is an object that allows you to save data as observables
 */
export class Store<T> {
	private _values: T;
	private _state: BehaviorSubject<T>;
	private readonly _stateObservable: Observable<T>;

	constructor(initialValues: T) {
		this._values = { ...initialValues };
		this._state = new BehaviorSubject<T>(this._values);
		this._stateObservable = this._state.asObservable().pipe(distinctUntilChanged(this.checkEquals));
	}

	/**
	 * Return all values of store as an observable.
	 */
	public select(): Observable<T> {
		return this._stateObservable.pipe(distinctUntilChanged(this.checkEquals));
	}

	/**
	 * Return a portion of store as observable using provided selector.
	 */
	public selectOnly<R>(selector: (state: T) => R): Observable<R> {
		return this._stateObservable.pipe(
			switchMap((state) => of(selector(state))),
			distinctUntilChanged(this.checkEquals),
		);
	}

	/**
	 * Return an object containing all values of store at the moment of take snapshot.
	 */
	public snapshot(): T {
		return { ...this._values };
	}

	/**
	 * Return an object containing a portion of store at the moment of take snapshot using provided selector.
	 */
	public snapshotOnly<R>(selector: (state: T) => R): R {
		return selector({ ...this._values });
	}

	/**
	 * Override all state setting provided value.
	 */
	public setState(newState: T) {
		this._values = { ...newState };
		this._state.next(this._values);
	}

	/**
	 * Override only provided state portion.
	 */
	public patchState(fields: Partial<T>) {
		this._values = { ...this._values, ...fields };
		this._state.next(this._values);
	}

	/**
	 * Check if two values are equal even with objects.
	 */
	private checkEquals<T>(previous: T, current: T): boolean {
		return JSON.stringify(previous) === JSON.stringify(current);
	}
}
