import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class KeyPressUntils {
  public keyPress(event: Event): void {
    const allowedKeys = /^[\d ]*$/;
    const target = event.target as HTMLInputElement;

    if (target && target.value && !target.value.match(allowedKeys)) {
      event.preventDefault();
      target.value = target.value.replace(/[^\d]/, "");
    }
  }
}
