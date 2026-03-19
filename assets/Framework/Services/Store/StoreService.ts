import { Service } from "../Core/Service";
import { ServiceLocator } from "../Core/ServiceLocator";
import { StoreSetup } from "./StoreSetup";

export class StoreService extends Service
{
    private state: any = {};
    private reducers: ((state: any, action: any) => any)[] = [];
    private listeners: ((state: any) => void)[] = [];
    private setup: StoreSetup;

    constructor(setup: StoreSetup)
    {
        super();
        this.setup = setup;
        ServiceLocator.onReady.push(() => this.startService());
    }

    public startService(): void
    {

    }

    public init(initialState: any)
    {
        this.state = initialState;
    }

    public addReducer(reducer: (state: any, action: any) => any)
    {
        this.reducers.push(reducer);
    }

    public dispatch(action: any)
    {
        let newState = this.state;

        for (const reducer of this.reducers)
        {
            newState = reducer(newState, action);
        }

        this.state = newState;

        // notify subscribers
        for (const listener of this.listeners)
        {
            listener(this.state);
        }
    }

    public getState()
    {
        return this.state;
    }

    public subscribe(listener: (state: any) => void)
    {
        this.listeners.push(listener);
    }
}
