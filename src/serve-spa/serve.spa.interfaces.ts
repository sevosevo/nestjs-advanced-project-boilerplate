export interface ServeSpaOptions {
    endpoints: string | Array<string>;
    rootPath: string;
    env?: string;
};
export interface ServeSpaModuleOpts {
    useFactory : (...any: any[]) => ServeSpaOptions | Promise<ServeSpaOptions>; 
    inject ?: any[];
}