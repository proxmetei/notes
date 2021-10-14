import {INote} from '../note/note.interface';
export interface ISection
{
  title: string;
  arrayOfNotes: INote[];
  removed: boolean;
  id: number;


}
