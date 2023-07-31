export interface IAlert {
    id?: string;
    type?: IAlertType;
    message?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;
}

export enum IAlertType {
    Success,
    Error,
    Info,
    Warning
}

export interface IAlertOptions {
    id?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}
