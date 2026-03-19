export abstract class Service
{
    update?(dt: number): void;
    stop?(): void;
}
