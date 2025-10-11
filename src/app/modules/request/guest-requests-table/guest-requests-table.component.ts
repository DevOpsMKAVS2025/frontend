import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-guest-requests-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule],
  templateUrl: './guest-requests-table.component.html',
})
export class GuestRequestsTableComponent {
  readonly dialog = inject(MatDialog);

  columnHeaders: { [key: string]: string } = {
    accommodation: 'Accommodation',
    startDate: 'Start Date',
    endDate: 'End Date',
    guests: 'Guests',
  };

  actions = [{ name: 'delete', label: 'Delete', color: 'warn' }];

  rows = [
    { accommodation: 'Apartment 1', startDate: '2025-10-11', endDate: '2025-10-15', guests: 2 },
    { accommodation: 'Studio 2', startDate: '2025-11-01', endDate: '2025-11-05', guests: 1 },
    { accommodation: 'Villa Sunset', startDate: '2025-12-20', endDate: '2025-12-25', guests: 4 },
  ];

  get columns() {
    return Object.keys(this.columnHeaders);
  }

  get displayedColumns() {
    return [...this.columns, 'actions'];
  }

  onAction(action: string, row: any) {
    if (action === 'delete') {
      this.dialog.open(ConfirmModalComponent, {
        width: '400px',
        data: {
          title: 'Delete Confirmation',
          message: `Are you sure you want to delete "${row.accommodation}"?`,
        },
      }).afterClosed().subscribe(confirmed => {
        if (confirmed) this.rows = this.rows.filter(r => r !== row);
      });
    }
  }
}
