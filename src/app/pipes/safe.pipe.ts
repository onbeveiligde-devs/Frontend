import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  // This exists because we're forced to not-use confidentiality, so we tell our browser we know what we're doing
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
