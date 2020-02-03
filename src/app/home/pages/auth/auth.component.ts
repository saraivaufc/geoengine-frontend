import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    async ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        } else {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code === null) {
                this.authService.login();
            } else {
                const state: any = params.get('state');
                await this.authService.getToken(code, state);
            }
        }
    }

}
