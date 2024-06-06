import { Credentials } from "./credentials";

export class Settings {
    darkMode = false;
    credentials = new Credentials;

    public reset(): void {
        this.darkMode = false;
        this.credentials = new Credentials;
    }

    public assign(value: object): void {
        this.reset();
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }

    constructor(value: any = {}) {
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
        console.log('save', this);
        localStorage.setItem('settings', JSON.stringify(this));
    }

}
