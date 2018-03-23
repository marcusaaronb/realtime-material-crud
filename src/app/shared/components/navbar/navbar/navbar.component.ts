import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() searchVal = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.searchVal.emit('baga');
  }

  public search(event){
    
  }

}
