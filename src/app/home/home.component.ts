import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from '../core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }
}
