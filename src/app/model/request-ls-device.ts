export class RequestLs {
    tag = 'l';
    code = '2a';
    accessCode = '2a';
    offset = 0;
    size = 10;

    public reset(): void {
        this.tag = 'l';
        this.code = '2a';
        this.accessCode = '2a';
        this.offset = 0;
        this.size = 10;
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
