import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    toggled = false;
    visible = false;

    constructor(private authService: AuthService) {
        timer(0, 1000).subscribe(t => {
            this.updateVisibility();
        });
    }

    ngOnInit() {

    }

    async updateVisibility() {
        if (window.location.href.indexOf('dashboard') > -1) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    public toggleSidebar() {
        this.toggled = !this.toggled;
    }

}
