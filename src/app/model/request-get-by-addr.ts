export class RequestGetByAddr {
    tag = 'g';
    code = '2a';
    accessCode = '2a';
    addr = '';

    public reset(): void {
        this.tag = 'a';
        this.code = '2a';
        this.accessCode = '2a';
        this.addr = '';
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
