// the main models
export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  student: UserDetails;
  lecturer: UserDetails;
}

export interface UserDetails {
  id?: number;
  name?: string;
  email?: string;
  role?: string | undefined;
  profile_image?: string;
}

export interface SubmissionDetails {
  id: number;
  description: string;
  document_path: string;
  submission_date: string;
  reviewed: boolean;
  project: ProjectDetails;
  student: UserDetails;
}

export interface FeedbackDetails {
  id: number;
  comment: string;
  feedback_date: string;
  submission: SubmissionDetails;
  lecturer: UserDetails;
}

export interface MessageDetails {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  messageDate: string;
}

// Form input interfaces

export interface loginFormData {
  email: string;
  password: string;
}
export interface loginFormErrors {
  email?: string;
  password?: string;
}

export interface registerFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role_id: number;
}

export interface CreateProjectFormData {
  title: string;
  lecturer_id: number;
  description: string;
  start_date: string;
  end_date: string;
}

export interface CreateSubmissionFormData {
  project_id: number;
  student_id: number;
  submission_date: string;
  document_path: string;
  description: string;
  reviewed: boolean;
}

export interface CreateFeedbackFormData {
  submission_id: number | null | undefined;
  feedback_date: string;
  comment: string;
}

// Component Properties

export interface UserCardProps {
  userName: string | null | undefined;
  projectName: string | null | undefined;
  supervisorName: string | null | undefined;
  submissions: number | null | undefined;
}
