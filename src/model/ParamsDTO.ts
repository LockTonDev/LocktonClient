export class ParamsDTO {
  private data: { [key: string]: any };

  constructor() {
    this.data = {};
  }

  add(key: string, value: any): void {
    this.data[key] = value;
  }

  remove(key: string): void {
    delete this.data[key];
  }

  setValue(key: string, value: any): void {
    if (this.data[key]) {
      this.data[key] = value;
    }
  }

  clear(): void {
    this.data = {};
  }

  getValue(key: string): any {
    return this.data[key];
  }

  getParams(): { [key: string]: any } {
    return this.data;
  }
}
