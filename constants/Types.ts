// types.ts
// @ts-ignore
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";

// Define the screens and their parameters for the Stack Navigator
export type HomeStackParamList = {
    Home: undefined;
};

// Define the screens and their parameters for the Drawer Navigator
export type DrawerParamList = {
    HomeStack: undefined;
    Profile: undefined;
};

// Define the Stack screen prop types
export type HomeScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'Home'>,
    DrawerScreenProps<DrawerParamList>
>;

// Type for the nested "roInfo" object
export interface RoInfo {
    id: number;
    name: string;
    role: 'ROLE_USER' | 'ROLE_ADMIN'; // Assuming other roles might exist
}

// Type for the nested "nrc" (National Registration Card) object
export interface Nrc {
    stateNumber: string;
    nrcType: string;
    township: string;
    citizenNumber: string;
    fullNRC: string;
}

// Type for the nested "allowance" object
export interface Allowance {
    teaAllowance: number;
    attendanceAllowance: number;
    punctualAllowance: number;
}

// A reusable type for each category within the leave quota
export interface LeaveBalance {
    total: number;
    remaining: number;
}

// Type for the nested "leaveQuota" object
export interface LeaveQuota {
    annual: LeaveBalance;
    casual: LeaveBalance;
    medical: LeaveBalance;
    paternity: LeaveBalance;
    maternity: LeaveBalance;
    marriage: LeaveBalance;
    funeral: LeaveBalance;
    unpaid: LeaveBalance;
}

// Type for the nested "tax" object
export interface Tax {
    ssbTax: number;
    personalIncomeTax: number;
}

// The main interface for the entire User Profile data structure
export  interface UserDataType {
    id: number,
    email: string,
    name: string,
    employeeId: string,
    pfUrl: string,
    position: string,
    departmentId: number,
    department: string,
    dob: string,
    level: string,
    roInfo: RoInfo,
    gender: 'MALE' | 'FEMALE' | 'OTHER',
    salary: number,
    maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED',
    salaryIncrement: number,
    phoneNumber: string,
    address: string,
    role: 'ROLE_USER' | 'ROLE_ADMIN',
    officeId: number,
    officeName: string,
    joinedDate: string,
    activeFlag: boolean,
    departments: null,
    permissions: any[],
    nrc: Nrc,
    allowance: Allowance,
    leaveQuota: LeaveQuota,
    tax: Tax,
    equipmentList: any[],
    ro: boolean,
    userData?: unknown
}
// Define the Drawer screen prop types
export type ProfileScreenProps = DrawerScreenProps<DrawerParamList, 'Profile'>;