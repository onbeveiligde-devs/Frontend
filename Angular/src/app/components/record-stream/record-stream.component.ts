import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {CryptoService} from '../../services/crypto.service';

@Component({
  selector: 'app-record-stream',
  templateUrl: './record-stream.component.html',
  styleUrls: ['./record-stream.component.css']
})
export class RecordStreamComponent implements OnInit {

  public user : User;
  public uuid : string;
  public privateKey: string;

  constructor(private cryptoService: CryptoService, private authService: AuthenticationService) {

  }

  async ngOnInit() {
    this.user = this.authService.getUser();
    this.privateKey = await this.cryptoService.wrapKey(this.authService.getPrivateKey());

  }

}
