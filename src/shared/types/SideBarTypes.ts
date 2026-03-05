export interface SidebarStaticItem {
  label: string;
  path: string;
  icon?: any;
}

export interface SidebarStaticSection {
  title: string;
  items: SidebarStaticItem[];
}

export interface SidebarUser {
  id: string;
  name: string;
}

export interface SidebarDivision {
  id: string;
  name: string;
  users: SidebarUser[];
}

export interface SidebarCompany {
  id: string;
  name: string;
  divisions: SidebarDivision[];
}
