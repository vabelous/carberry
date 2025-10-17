import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketsPort } from '@carberry/front-end-core-ports-secondary-websockets';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `
    <h1>
      Welcome to auth!
    </h1>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome implements OnInit
{
  private _websocketsPort = inject(WebsocketsPort);

  ngOnInit(): void {
    console.log(this._websocketsPort);
    this._websocketsPort.connect();
    this._websocketsPort
    .sendMessage('Привет белочка', 'auth');
  }

}
