import { Injectable } from '@angular/core';
import {INote} from '../sectm/note/note.interface';
import {ISection} from '../sectm/section/section.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Observable, of, from } from 'rxjs';
import { filter, groupBy, mergeMap, toArray, zip } from 'rxjs/operators';
import { makeBindingParser } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SectionService {
  date: number = null;
  index = 0;
 sectionId = 0;
 noteId = 0;
 arrayOfSection: ISection[] = [];
 sections$(): Observable<ISection[]>{
  return of(this.arrayOfSection);
}
/**
 * Загрузка имеющихся секций.
 */
loadSections(input: any[]): void
{
  for (const section of input)
  {
    console.log(section.title);
    const tempSection: ISection = {
    title : section.title,
    removed : section.removed,
    id : section.id,
    arrayOfNotes: []
  };

    for (const note of section.arrayOfNotes)
    {
      const tempnote: INote = {
        name : note.name,
        subtitle: note.subtitle,
      sectionId : note.sectionId,
      noteId : note.noteId,
      noteText : note.noteText,
     removed : note.removed,
      date : new Date(note.date)
    };
      tempSection.arrayOfNotes.push(tempnote);
      this.noteId++;
    }
    this.arrayOfSection.push(tempSection);
    this.sectionId ++;
  }
}
/**
 * Устанавливается дата.
 */
setDate(date: number): void
{
  this.date = date;
  console.log(this.date);
}
/**
 * Фильтрация по дате.
 */
dateSelector(s: ISection): INote[]
{
  console.log(this.date);
  if (this.date !== null) {
  return s.arrayOfNotes.filter(n => n.date.getDate() === this.date);
  }
  else
  {
    return s.arrayOfNotes;
  }
}
/**
 * Изменение заметки.
 */
 changeNote(note: INote, myForm: FormGroup): Observable<INote>
 {
  const date = new Date(myForm.value.date);
  note.date = date;
  note.noteText = myForm.value.text;
  note.name = myForm.value.title;
  return of(note);
 }
/**
 * Нахождение индекса секции по id.
 */
sectionById(id: number): number
{
  let i = 0;
  for (; i < this.arrayOfSection.length; i++)
  {
    if (this.arrayOfSection[i].id === id)
    {
      return i;
    }
  }
}
/**
 * Нахождение секции по id.
 */
findSection(id: number): ISection
{
 return this.arrayOfSection[this.sectionById(id)];
}
/**
 * Нахождение массива заметок по id секции.
 */
getAllNotes(id: number): Observable<INote[]>
{
  return of(this.arrayOfSection[this.sectionById(id)].arrayOfNotes);
}
/**
 * Сортировка массива заметок.
 */
sortNotes(notes: INote[], flag: boolean): INote[] {
  if (flag) {
      return this.quickSort(notes, 0, notes.length - 1);
  }
  else {
      return this.quickSort(notes, 0, notes.length - 1).reverse();
  }
}

private partition(arr: INote[], left: number, right: number): number {
  const p: number = arr[left].date.getTime();
  let i: number = left;
  let j: number = right;
  while (i <= j) {
      while (arr[i].date.getTime() < p) {
          i++;
      }
      while (arr[j].date.getTime() > p) {
          j--;
      }
      if (i <= j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          i++;
          j--;
      }
  }
  return i;
}

private quickSort(arr: INote[], left: number, right: number): INote[] {
  let p: number;
  if (left < right) {
      p = this.partition(arr, left, right);
      this.quickSort(arr, left, p - 1);
      this.quickSort(arr, p, right);
  }
  return arr;
}
/**
 * Фильтрация массива заметок по четности(нечетности).
 */
getEvenNotes(s: ISection, even: boolean, uneven: boolean): INote[] {
  if (even && !uneven) {
      return s.arrayOfNotes.filter(n => n.date.getDate() % 2 === 0);
  }
  if (uneven && !even) {
      return s.arrayOfNotes.filter(n => n.date.getDate() % 2 !== 0);
  }
  else {
      return s.arrayOfNotes;
  }
}
/**
 * Добаление секции.
 */
  addSection(form: FormGroup): Observable<ISection[]>{
    console.log(form);
    this.arrayOfSection.push(
      {
        id: this.sectionId,
        arrayOfNotes: [],
        title: form.value.title,
        removed: false
      }
    );
    this.sectionId++;
    return of(this.arrayOfSection);
  }
/**
 * Получение заметки по id секции и заметки.
 */
  getNote(idSection: number, idNote: number): INote {
    console.log(idNote);
   console.log( this.arrayOfSection.find(s => s.id === idSection));
    return this.arrayOfSection.find(s => s.id === idSection).arrayOfNotes.find(n => n.noteId === idNote);
}

/**
 * Добавление заметки.
 */
  addNote(note: INote): Observable<ISection>{
    this.arrayOfSection[this.sectionById(note.sectionId)].arrayOfNotes.push(note);
    const observable$ = new Observable(subscriber => {
      subscriber.next(this.arrayOfSection[this.sectionById(note.sectionId)]);
    });
    return of(this.arrayOfSection[this.sectionById(note.sectionId)]);
  }
/**
 * Изменение имени секции.
 */
  changeSectionName(id: number, form: FormGroup): Observable<ISection> {
    console.log(form);
    this.arrayOfSection[this.sectionById(id)].title = form.value.title;
    return of(this.arrayOfSection[this.sectionById(id)]);
  }
/**
 * Удаление секции.
 */
  deleteSection(id: number): Observable<ISection[]>{
    this.arrayOfSection.splice(this.sectionById(id), 1);
    return of(this.arrayOfSection);
  }
/**
 * Получение массива секций.
 */
  getAllSections(): Observable<ISection[]> {
    return of(this.arrayOfSection);
}
/**
 * Удаление заметки.
 */
  deleteNote(note: INote): void{
    const s = this.arrayOfSection.find(value => value.id === note.sectionId);
    const i = s.arrayOfNotes.findIndex(n => n.noteId === note.noteId);
    s.arrayOfNotes.splice(i, 1);
  }

  checkAll(): void
  {
    this.arrayOfSection.forEach((e: ISection)=>{ e.arrayOfNotes.forEach((note:INote)=>{
      if(note.sectionId!==e.id)
      {
        note.sectionId=e.id;
      }
    })})
  }
}
