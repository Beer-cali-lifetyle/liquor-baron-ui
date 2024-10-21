import { Injectable } from '@angular/core';

export class Options {
    delay?: number
}

@Injectable({ providedIn: 'root' })
export class UiToasterService {

    toasts: any[] = [];

    // Un used 
    // show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    //     this.toasts.push({ textOrTpl, ...options });
    // }

    async Remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    async Success(message: string, options?: { delay?: number }) {
        this.toasts.push({ delay: 5000, textOrTpl: message, classname: 'toast-success', iconClass: 'fa fa-check-circle', ...options, });
    }

    async Error(message: string, options?: { delay?: number }) {
        this.toasts.push({ delay: 5000, textOrTpl: message, classname: 'toast-error', iconClass: 'fa fa-exclamation-circle', ...options });
    }

    async Warning(message: string, options?: { delay?: number }) {
        this.toasts.push({ delay: 5000, textOrTpl: message, classname: 'toast-warning', iconClass: 'fa fa-exclamation-triangle', ...options });
    }
}