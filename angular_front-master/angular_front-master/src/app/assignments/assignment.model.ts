export class Assignment {
  _id?: string;
  id: number;
  title: string;
  teacher: {
    full_name:String,
    profil: String
  };
  illustration: String;
  mark: number;  
  delivered: boolean;
  end_date: Date;
  rendu?: boolean;  
  student:{
    full_name: String
  }
}
