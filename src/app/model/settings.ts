export class Settings {
    darkMode = false;

    public reset(): void {
        this.darkMode = false;
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

    public save(): void {
        localStorage.setItem('settings', JSON.stringify(this));
    }

}
