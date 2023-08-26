import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class KeyPressUntils {
  public keyPress(event: KeyboardEvent): void {
    const allowedKeys = /^[0-9]$/;
    if (!event.key.match(allowedKeys)) {
      event.preventDefault();
    }
  }
}
