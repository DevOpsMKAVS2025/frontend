import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { CreateRequestModalComponent } from '../modal/create-request-modal/create-request-modal.component';
import { RequestService } from '../../services/request.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Request } from '../../models/request';

@Component({
  selector: 'app-guest-request-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule, MatSnackBarModule],
  templateUrl: './guest-request-reservation.component.html',
  styleUrl: './guest-request-reservation.component.css',
})
export class GuestRequestReservationComponent implements OnInit {
  readonly #requestService = inject(RequestService);
  readonly #userService = inject(UserService);
  readonly #snackBar = inject(MatSnackBar);
  readonly #route = inject(ActivatedRoute);
  readonly #dialog = inject(MatDialog);

  guestId: string = '';

  tableType: 'requests' | 'reservations' = 'requests';

  columnHeaders: { [key: string]: string } = {
    accommodation: 'Accommodation',
    startDate: 'Start Date',
    endDate: 'End Date',
    guestNum: 'Guests',
  };

  rows: Request[] = [];
  actions: { name: string; label: string; color?: string } [] = [];

  get columns() {
    return Object.keys(this.columnHeaders);
  }

  get displayedColumns() {
    return [...this.columns, 'actions'];
  }

  constructor() {
    this.#userService.user.subscribe({
      next: (user) => {
        this.guestId = user?.id!;
      }
    })
  }

  ngOnInit(): void {
    const type = this.#route.snapshot.paramMap.get('type');
    this.tableType = type === 'reservations' ? 'reservations' : 'requests';

    if (this.tableType === 'requests') {
      this.#getRequests();
      this.actions = [{ name: 'delete', label: 'Delete', color: 'warn' }];
    } else {
      this.#getReservations();
      this.actions = [{ name: 'reject', label: 'Reject', color: 'warn' }];
    }
  }

  #getRequests(): void {
    this.#requestService.getAllGuestRequests(this.guestId)
    .subscribe((data: Request[]) => {
      this.rows = data;
    });
  }

  #getReservations(): void {
    this.#requestService.getAllGuestReservations(this.guestId)
    .subscribe((data: Request[]) => {
      const now = new Date();

      this.rows = data.map(r => ({
        ...r,
        canReject: (new Date(r.startDate).getTime() - now.getTime()) >= 24 * 60 * 60 * 1000
      }));
    });
  }

  protected onAction(action: string, row: any): void {
    this.#dialog
      .open(ConfirmModalComponent, {
        width: '400px',
        data: {
          title: action === 'delete' ? 'Delete Confirmation' : 'Reject Confirmation',
          message: `Are you sure you want to ${action} "${row.accommodation}"?`,
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          if(action === 'delete') {
            this.#requestService.deleteRequest(row.id).subscribe(() => {
              this.#getRequests();
            });
          } else if(action === 'reject') {
            this.#requestService.rejectReservation(row.id).subscribe(() => {
              this.#getReservations();
            });
          }
        }
      });
  }

  protected openCreateRequestDialog(): void {
    const dialogRef = this.#dialog.open(CreateRequestModalComponent, {
      width: '450px',
      data: {
        guestId: this.guestId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#requestService.createRequest(result).subscribe({
          next: () => {
            this.#getRequests();
          },
          error: (err) => {
            if (err.status === 500) {
              const message = err.error?.detail || 'Unexpected error';
              const match = message.match(/'(.*?)'/);
              const textToShow = match ? match[1] : message;

              this.#snackBar.open(textToShow, 'OK', {
                duration: 3000
              });
            }
          }
        });
      }
    });
  }
}