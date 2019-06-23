import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {CryptoService} from '../../../services/crypto.service';

@Component({
  selector: 'app-check-keys',
  templateUrl: './check-keys.component.html',
  styleUrls: ['./check-keys.component.css']
})
export class CheckKeysComponent implements OnInit {

  public privateKey;
  public publicKey;

  constructor(private crypto: CryptoService, private authService: AuthenticationService) { }

  async ngOnInit() {
    this.privateKey = await this.crypto.wrapKey(this.authService.getPrivateKey());
    this.publicKey = await this.crypto.wrapKey(this.authService.getPublicKey());
  }

  copy(text) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
