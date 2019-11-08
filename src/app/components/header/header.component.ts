import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../providers/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {skip} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked {
    @Input() activePage: string;
    isAuthenticated = false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
        this.isAuthenticated = this.authenticationService.isAuthenticated();
        if (this.isAuthenticated) {
            return;
        } else {
            this.activatedRoute.queryParams.pipe(skip(1)).subscribe(params => {
                const code = params['code'];
                alert(code); // Print the parameter to the console.

                if (code) {
                    this.authenticationService.login(code);
                } else {
                    window.location.href = 'http://localhost:8000/o/authorize/?client_id='
                        + environment.auth.client_id
                        + '&response_type=code&redirect_uri='
                        + environment.auth.redirectUrl
                        + '&state=1';
                }
            });
        }
    }

}
