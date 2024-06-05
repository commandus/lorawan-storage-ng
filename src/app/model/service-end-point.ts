export class EndPoint {
    public url = "";
    public name = "";
    public selected = false;
  }
  
export class EndPointList {
    public add(value: EndPoint) {
        this.endpoints.push(value);
        this.current = this.endpoints[this.endpoints.length - 1];
    }

    public endpoints: EndPoint[] = [];
    public current = new EndPoint;

    public select(name: string | null) : void {
        if (name == null) {
        this.current = this.endpoints[0];
        return;
        }
        this.endpoints.forEach(e => {
        e.selected = e.name == name;
        if (e.selected)
            this.current = e;
        });
    }
}
