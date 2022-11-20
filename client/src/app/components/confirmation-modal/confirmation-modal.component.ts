import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements AfterViewInit {

  private readonly ESC_KEY = 27;

  @ViewChild("confirmationModal") confirmationModal!: ElementRef<HTMLDialogElement>;
  @ViewChild("addButton") addButton!: ElementRef<HTMLButtonElement>;

  onClose = new Subject<boolean>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.ESC_KEY === event.keyCode) {
      this.confirmationModal.nativeElement.close();
    }
  }

  ngAfterViewInit(): void {
    this.addButton.nativeElement.focus();
  }

  handleClick(addPlaylist: boolean): void {
    this.onClose.next(addPlaylist);
  }
}
