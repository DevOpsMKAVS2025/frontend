import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { CreateRequestModalComponent } from '../modal/create-request-modal/create-request-modal.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-guest-request-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule],
  templateUrl: './guest-request-reservation.component.html',
  styleUrl: './guest-request-reservation.component.css',
})
export class GuestRequestReservationComponent {
  readonly #requestService = inject(RequestService);
  readonly #route = inject(ActivatedRoute);
  readonly #dialog = inject(MatDialog);

  tableType: 'requests' | 'reservations' = 'requests';

  columnHeaders: { [key: string]: string } = {
    accommodation: 'Accommodation',
    startDate: 'Start Date',
    endDate: 'End Date',
    guestNum: 'Guests',
  };

  rows: Request[] = [];
  actions: { name: string; label: string; color?: string }[] = [];

  get columns() {
    return Object.keys(this.columnHeaders);
  }

  get displayedColumns() {
    return [...this.columns, 'actions'];
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
    this.#requestService.getAllGuestRequests('3fa85f64-5717-4562-b3fc-2c963f66afa6') // todo
    .subscribe((data: Request[]) => {
      this.rows = data;
    });
  }

  #getReservations(): void {
    this.#requestService.getAllGuestReservations('3fa85f64-5717-4562-b3fc-2c963f66afa6') // todo
    .subscribe((data: Request[]) => {
      this.rows = data;
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
          this.rows = this.rows.filter((r) => r !== row);
        }
      });
  }

  protected openCreateRequestDialog(): void {
    const dialogRef = this.#dialog.open(CreateRequestModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New Request Data:', result);
        this.#requestService.createRequest(result).subscribe(() => {
          this.#getRequests();
          // this.rows = [...this.rows, result];
        });
      }
    });
  }
}