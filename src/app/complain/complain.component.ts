import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Report {
  id: number;
  type: string;
  priority: string;
  location: string;
  description: string;
  status: string;
  timestamp: string;
  contact?: string;
  photo: boolean;
}

@Component({
  selector: 'app-complain',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './complain.component.html',
  styleUrl: './complain.component.scss'
})
export class ComplainComponent {
  activeTab: string = 'report';
  showSuccessMessage: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string = '';

  reportFormData = {
    type: '',
    priority: '',
    location: '',
    description: '',
    contact: '',
    reporterName: '',
    phone: '',
    incidentDate: ''
  };

  statusFilter: string = 'all';
  priorityFilter: string = 'all';
  typeFilter: string = 'all';

  reports: Report[] = [
    {
      id: 1,
      type: 'illegal-dumping',
      priority: 'high',
      location: 'Oak Street & 5th Avenue',
      description: 'Large pile of construction debris dumped on sidewalk',
      status: 'pending',
      timestamp: '2024-01-15 09:30',
      contact: 'citizen@email.com',
      photo: true
    },
    {
      id: 2,
      type: 'overflowing-bin',
      priority: 'high',
      location: 'Central Park Entrance',
      description: 'Trash bin overflowing, attracting pests',
      status: 'in-progress',
      timestamp: '2024-01-15 08:15',
      contact: undefined,
      photo: true
    },
    {
      id: 3,
      type: 'litter',
      priority: 'medium',
      location: 'Main Street Bus Stop',
      description: 'Scattered food containers and bottles around bus stop',
      status: 'pending',
      timestamp: '2024-01-15 07:45',
      contact: 'concerned.citizen@email.com',
      photo: false
    },
    {
      id: 4,
      type: 'broken-bin',
      priority: 'medium',
      location: 'Riverside Park',
      description: 'Trash bin lid broken, contents spilling out',
      status: 'pending',
      timestamp: '2024-01-14 16:20',
      contact: undefined,
      photo: true
    },
    {
      id: 5,
      type: 'hazardous',
      priority: 'low',
      location: 'Industrial District',
      description: 'Old paint cans left near dumpster',
      status: 'resolved',
      timestamp: '2024-01-14 14:10',
      contact: 'safety.first@email.com',
      photo: true
    }
  ];

  filteredReports: Report[] = [...this.reports];

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'dashboard') {
      this.filterReports();
    }
  }

  submitReport() {
    const newReport: Report = {
      id: this.reports.length + 1,
      type: this.reportFormData.type,
      priority: this.reportFormData.priority,
      location: this.reportFormData.location,
      description: this.reportFormData.description,
      contact: this.reportFormData.contact || undefined,
      photo: !!this.selectedFile,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending'
    };

    this.reports.unshift(newReport);
    this.filterReports();
    this.showSuccessMessage = true;
    this.resetForm();
  }

  resetForm() {
    this.reportFormData = {
      type: '',
      priority: '',
      location: '',
      description: '',
      contact: '',
      reporterName: '',
      phone: '',
      incidentDate: ''
    };
    this.selectedFile = null;
    this.imagePreview = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    fileInput.click();
  }

  removePhoto() {
    this.selectedFile = null;
    this.imagePreview = '';
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    fileInput.value = '';
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'illegal-dumping': '🚛',
      'overflowing-bin': '🗑️',
      'litter': '🍃',
      'hazardous': '⚠️',
      'broken-bin': '🔧',
      'other': '❓'
    };
    return icons[type] || '❓';
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': 'bg-orange-100 text-orange-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  updateReportStatus(reportId: number, newStatus: string) {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = newStatus;
      this.filterReports();
    }
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => {
      return (this.statusFilter === 'all' || report.status === this.statusFilter) &&
             (this.priorityFilter === 'all' || report.priority === this.priorityFilter) &&
             (this.typeFilter === 'all' || report.type === this.typeFilter);
    });
  }

  getUrgentCount(): number {
    return this.reports.filter(r => r.priority === 'high' && r.status !== 'resolved').length;
  }

  getPendingCount(): number {
    return this.reports.filter(r => r.status === 'pending').length;
  }

  getResolvedTodayCount(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.reports.filter(r => r.status === 'resolved' && r.timestamp.startsWith(today)).length;
  }

  getResolvedCount(): number {
    return this.reports.filter(r => r.status === 'resolved').length;
  }

  trackByReportId(index: number, report: Report): number {
    return report.id;
  }
}
