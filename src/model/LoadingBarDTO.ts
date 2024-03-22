export class LoadingBarDTO {
  showMessage: boolean;
  resolve: (result: boolean) => void;
  callback: (result: boolean) => void;

  constructor(data: Partial<LoadingBarDTO> = {}) {
    this.showMessage = data.showMessage || false;
    this.resolve = data.resolve || (() => {});
    this.callback = data.callback || (() => {});
  }

  setInfo(title: string, message: string) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.resolve = resolve;
    });
  }
 
  setConfirm(title: string, message: string, params: string, callback: (result: boolean, params: string) => void) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.resolve = (result: boolean) => {
        callback(result, params);
        resolve(result);
      };
    });
  }

  close() {
    this.showMessage = false;
    // this.type = '';
    // this.id = '';
    // this.title = '';
    // this.message = '';
    // this.params = '';
    this.resolve(false);
  }

  confirm() {
    this.showMessage = false;
    // this.type = '';
    // this.id = '';
    // this.title = '';
    // this.message = '';
    // this.params = '';
    this.resolve(true);
  }
}
