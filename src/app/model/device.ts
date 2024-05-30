export class Device {
    addr = '';
    activation = 'ABP';
    class = 'A';
    deveui = '';
    nwkSKey = '';
    appSKey = '';
    version = 0;
    appeui = '';
    appKey = '';
    nwkKey = '';
    devNonce = '';
    joinNonce = '';
    name = '';

    public reset(): void {
        this.addr = '';
        this.activation = 'ABP';
        this.class = 'A';
        this.deveui = '';
        this.nwkSKey = '';
        this.appSKey = '';
        this.version = 0;
        this.appeui = '';
        this.appKey = '';
        this.nwkKey = '';
        this.devNonce = '';
        this.joinNonce = '';
        this.name = '';
        }

    public assign(value: object): void {
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }

    constructor(value: any = {}) {
        this.reset();
        try {
            let v;
            if (typeof value == 'string')
                v = JSON.parse(value);
            else
                v = value;
            if (typeof v !== 'undefined')
                this.assign(v);
        } catch (error) {
        
        }
    }

}
