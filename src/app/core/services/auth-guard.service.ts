import {HostListener, Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanDeactivate<ComponentCanDeactivate> {

    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate() {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }

    canDeactivate(component: ComponentCanDeactivate): boolean {
        return component.canDeactivate();
    }
}


export abstract class ComponentCanDeactivate {
    abstract canDeactivate(): boolean;

    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue = true;
        }
    }
}
