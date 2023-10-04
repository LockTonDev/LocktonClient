export class MessageBoxDTO {
  showMessage: boolean;
  type: string;
  id: string;
  title: string;
  message: string;
  params: string;
  result: boolean;
  resolve: (result: boolean) => void;
  callback: (result: boolean) => void;

  constructor(data: Partial<MessageBoxDTO> = {}) {
    this.showMessage = data.showMessage || false;
    this.type = data.type || 'info';
    this.id = data.id || '';
    this.title = data.title || '';
    this.message = data.message || '';
    this.params = data.params || '';
    this.result = data.result || false;
    this.resolve = data.resolve || (() => {});
    this.callback = data.callback || (() => {});
  }

  setInfo(title: string, message: string) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.type = 'info';
      this.id = '';
      this.title = title;
      this.message = message;
      this.resolve = resolve;
    });
  }
 
  setConfirm(title: string, message: string, params: string, callback: (result: boolean, params: string) => void) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.type = 'confirm';
      this.title = title;
      this.message = message;
      this.params = params;
      this.resolve = (result: boolean) => {
        callback(result, params);
        resolve(result);
      };
    });
  }
  setWarning(title: string, message: string) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.type = 'warning';
      this.id = '';
      this.title = title;
      this.message = message;
    });
  }

  setCustom(type:string, title: string, message: string, params: string, callback: (result: boolean, params: string) => void) {
    return new Promise<boolean>(resolve => {
      this.showMessage = true;
      this.type = type;
      this.title = title;
      this.message = message;
      this.params = params;
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
    this.result = false;
    this.resolve(false);
  }

  confirm() {
    this.showMessage = false;
    // this.type = '';
    // this.id = '';
    // this.title = '';
    // this.message = '';
    // this.params = '';
    this.result = true;
    this.resolve(true);
  }
}
