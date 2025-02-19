import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
  standalone: false,
})
export class MenuAdminPage implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }

}
