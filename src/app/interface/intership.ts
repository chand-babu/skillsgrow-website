export interface InternshipDataModel {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    contact: string;
    companyName: string;
    companyUrl: string;
    companyDescription: string;
    companyLogo: string;
    category: string;
    jobRole:string;
    dateOfJoining: string;
    location: string;
    qualification: string;
    salary: string;
    internType: string;
    contactPersonNo: string;
    contactPersonEmail: string;
    jobDescription: string;
    createdOn?: string;
    status?:number;
}

export interface CompanyLoginModel {
    email: string;
    password: string;
}

export interface InternshipFormModel {
    companyId: string;
    categoryId: string;
    jobRole:string;
    dateOfJoining: any;
    location: string;
    qualification: string;
    salary: string;
    internType: string;
    contactPersonNo: string;
    contactPersonEmail: string;
    jobDescription: string;
    createdOn?: string;
    status?:number;
}

export interface UserDetails {
    _id?: string;
    firstname: string;
    lastname: string;
    password?: string;
    email: string;
    contact: string;
    companyName: string;
    companyUrl: string;
    companyDescription: string;
    companyLogo: string;
	createdOn?: string;
	status?: number;
};