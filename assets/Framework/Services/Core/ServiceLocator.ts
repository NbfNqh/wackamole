type Callback = () => void;
export class ServiceLocator
{
    private static _services: Map<Function, any> = new Map();

    public static onReady: Callback[] = [];

    /**
     * Register a service instance
     */
    public static register<T>(ctor: new (...args: any[]) => T, service: T): void
    {
        if (this._services.has(ctor))
        {
            console.warn(`Service ${ctor.name} already registered. Replacing it.`);
        }

        this._services.set(ctor, service);
    }

    /**
     * Get a service instance
     */
    public static get<T>(ctor: new (...args: any[]) => T): T
    {
        const service = this._services.get(ctor);

        if (!service)
        {
            throw new Error(`Service ${ctor.name} not found. Make sure it's registered.`);
        }

        return service as T;
    }

    /**
     * Check if service exists
     */
    public static has<T>(ctor: new (...args: any[]) => T): boolean
    {
        return this._services.has(ctor);
    }

    /**
     * Remove a service
     */
    public static unregister<T>(ctor: new (...args: any[]) => T): void
    {
        if (this._services.has(ctor))
        {
            this._services.delete(ctor);
        } else
        {
            console.warn(`Service ${ctor.name} not found when trying to unregister.`);
        }
    }

    /**
     * Clear everything
     */
    public static clearAll(): void
    {
        this._services.forEach((service) =>
        {
            if (service && typeof service.stop === "function")
            {
                service.stop();
            }
        });

        this._services.clear();
    }

    /**
     * Update loop (call from a Cocos Component)
     */
    public static update(dt: number): void
    {
        this._services.forEach((service) =>
        {
            if (service && typeof service.update === "function")
            {
                service.update(dt);
            }
        });
    }

    /**
     * LateUpdate equivalent (manual in Cocos)
     */
    public static lateUpdate(): void
    {
        this._services.forEach((service) =>
        {
            if (service && typeof service.lateUpdate === "function")
            {
                service.lateUpdate();
            }
        });
    }
}
