import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { CreateRequestModalComponent } from '../modal/create-request-modal/create-request-modal.component';

@Component({
  selector: 'app-guest-request-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule],
  templateUrl: './guest-request-reservation.component.html',
  styleUrl: './guest-request-reservation.component.css'
})
export class GuestRequestReservationComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #dialog = inject(MatDialog);

  tableType: 'requests' | 'reservations' = 'requests';

  columnHeaders: { [key: string]: string } = {
    accommodation: 'Accommodation',
    startDate: 'Start Date',
    endDate: 'End Date',
    guests: 'Guests',
  };

  rows: any[] = [];
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
      this.rows = [
        { accommodation: 'Apartment 1', startDate: '2025-10-11', endDate: '2025-10-15', guests: 2 },
        { accommodation: 'Studio 2', startDate: '2025-11-01', endDate: '2025-11-05', guests: 1 },
        { accommodation: 'Villa Sunset', startDate: '2025-12-20', endDate: '2025-12-25', guests: 4 },
      ];
      this.actions = [{ name: 'delete', label: 'Delete', color: 'warn' }];
    } else {
      this.rows = [
        { accommodation: 'Villa Sunset', startDate: '2025-12-20', endDate: '2025-12-25', guests: 4 },
        { accommodation: 'Studio 3', startDate: '2025-11-05', endDate: '2025-11-10', guests: 1 },
      ];
      this.actions = [{ name: 'reject', label: 'Reject', color: 'warn' }];
    }
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
        this.rows = [...this.rows, result];
      }
    });
  }
}