import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-host-request-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './host-request-reservation.component.html',
  styleUrl: './host-request-reservation.component.css',
})
export class HostRequestReservationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  tableType: 'requests' | 'reservations' = 'requests';

  columnHeaders: { [key: string]: string } = {};
  rows: any[] = [];
  actions: { name: string; label: string; color?: string }[] = [];

  autoApproveRequests = false;

  get columns() {
    return Object.keys(this.columnHeaders);
  }

  get displayedColumns() {
    return this.tableType === 'requests' ? [...this.columns, 'actions'] : [...this.columns];
  }

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    this.tableType = type === 'reservations' ? 'reservations' : 'requests';

    if (this.tableType === 'requests') {
      this.columnHeaders = {
        user: 'User',
        startDate: 'Start Date',
        endDate: 'End Date',
        guests: 'Guests',
        cancellations: 'Cancellations',
      };
      this.actions = [
        { name: 'approve', label: 'Approve', color: 'primary' },
        { name: 'reject', label: 'Reject', color: 'warn' },
      ];
      this.#getRequests();
    } else {
      this.columnHeaders = {
        user: 'User',
        startDate: 'Start Date',
        endDate: 'End Date',
        guests: 'Guests',
      };
      this.actions = [];
      this.#getReservations();
    }
  }

  #getRequests(): void {
    // TODO: Fetch requests from API
    this.rows = [
      { user: 'John Doe', startDate: '2025-10-11', endDate: '2025-10-15', guests: 2, cancellations: 1 },
      { user: 'Jane Smith', startDate: '2025-11-01', endDate: '2025-11-05', guests: 1, cancellations: 0 },
    ];
  }

  #getReservations(): void {
    // TODO: Fetch reservations from API
    this.rows = [
      { user: 'Alice', startDate: '2025-12-20', endDate: '2025-12-25', guests: 4 },
      { user: 'Bob', startDate: '2025-11-05', endDate: '2025-11-10', guests: 1 },
    ];
  }

  protected onAction(action: string, row: any): void {
    let title = '';
    let message = '';

    if (action === 'approve') {
      title = 'Approve Confirmation';
      message = `Do you want to approve request for ${row.user}?`;
    } else if (action === 'reject') {
      title = 'Reject Confirmation';
      message = `Do you want to reject request for ${row.user}?`;
    }

    this.dialog
      .open(ConfirmModalComponent, {
        width: '400px',
        data: { title, message },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          // TODO: Perform action (approve/reject) via API
          this.#getRequests();
        }
      });
  }

  protected onAutoApproveChange(value: boolean): void {
    console.log('Auto-approve requests:', value);
    // TODO: Save this setting via API
  }
}
