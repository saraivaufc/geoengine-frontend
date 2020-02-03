import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {timer} from 'rxjs';
import {UserModel} from '../models/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() activePage: string;
    isAuthenticated = false;
    user: UserModel;

    constructor(private authService: AuthService) {
        timer(0, 1000).subscribe(t => {
            this.update();
        });
    }

    ngOnInit(): void {
    }

    async update() {
        if (this.authService.isAuthenticated() && !this.isAuthenticated) {
            const userInfo = await this.authService.me();
            console.log(userInfo);
            this.user = new UserModel();
            this.user.firstName = userInfo['first_name'];
            this.user.lastName = userInfo['last_name'];
            this.user.email = userInfo['email'];
            this.isAuthenticated = true;
            console.log(this.user);
        }
    }
}
