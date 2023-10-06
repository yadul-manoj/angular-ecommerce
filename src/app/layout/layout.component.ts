import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  atValidSidebarPage!: boolean;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Subscribing for params using activated route doesnt work because router outlet is outside the component (but works for queryparams)
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let curUrlTree = this.router.parseUrl(this.router.url).toString().split(/[/?=&]+/);
        this.checkValidSidebarPage(curUrlTree);
      }
    });

  }

  checkValidSidebarPage(curUrlTree: string[]) {
    // console.log(curUrlTree);
 
    if (curUrlTree[1] == 'home' ||
      (curUrlTree[1] == 'products' && curUrlTree[2] == undefined) ||
      (curUrlTree[1] == 'products' && curUrlTree[2] == 'category') ||
      (curUrlTree[1] == 'products' && curUrlTree[2] == 'search') ||
      (curUrlTree[1] == 'products' && curUrlTree[2] == 'sort')
    )
      this.atValidSidebarPage = true;
    else 
      this.atValidSidebarPage = false;
  }
}
