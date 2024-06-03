export class Credentials {
    public code = '2a';
    public accesscode = '2a';

    constructor(value: any = {}) {
        this.reset();
        try {
          let v;
          if (typeof value == 'string') {
                v = JSON.parse(value);
          } else {
              v = value;
          }
          if (typeof v !== 'undefined') {
              this.assign(v);
          }
        } catch (error) {
          
        }
      }

    public assign(value: object): any {
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }
  
    public logout(): void {
        this.reset();
        localStorage.removeItem('user');
    }

    private reset() {
        this.code = '2a';
        this.accesscode = '2a';
    }
}
