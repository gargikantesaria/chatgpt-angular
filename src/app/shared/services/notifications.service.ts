import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastr: ToastrService, private router: Router) {
    }
    //  For notification
    showToast(msg: string, type: string) {
        type == "error" ? this.toastr.error(msg, 'Error') : this.toastr.success(msg, 'Success');
    }
}