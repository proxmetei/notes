import {
  Component, Injectable, Input, OnChanges, OnInit, Output, EventEmitter, ViewChild,
  ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { INote } from '../note/note.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../service/section.service';
import { ModalnoteComponent } from '../modal/modalnote/modalnote.component';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
/**
 * Класс комнопента заметки.
 */
export class NoteComponent implements OnInit, OnChanges {
  @Input() note: INote;
  @Input() dates: INote;

  @Output() noteDelete = new EventEmitter<INote>();
  @Output() changeNote = new EventEmitter<INote>();
  @ViewChild('modalForNote', { read: ViewContainerRef }) containerNote;
  iconTrash = faTrashAlt;
  iconEdit = faEdit;
  myForm: FormGroup;
  date: Date;
  noteText: string;
  name: string;
  isDispalyedchange = true;
  /**
   * Изменение заметки.
   */
  openfornote(): void {
    console.log('ed');
    this.changeNote.emit(this.note);
  }
  /**
   * Удаление заметки.
   */
  remove(): void {
    console.log('Hi');
    this.note.removed = true;
    console.log(this.note);
    this.noteDelete.emit(this.note);
  }

  constructor(private formBuilder: FormBuilder, public dataService: SectionService, private resolver: ComponentFactoryResolver) {

  }
  ngOnInit(): void {
    console.log(this.note);
    this.date = this.note.date;
    this.noteText = this.note.noteText;
    this.name = this.note.name;
    if (this.note.removed === true) {
      document.getElementsByClassName('notes__item');
    }
  }
  ngOnChanges(): void {
    console.log(1);
    console.log(this.note);
    this.date = this.note.date;
    this.noteText = this.note.noteText;
    this.name = this.note.name;
    if (this.note.removed === true) {
      document.getElementsByClassName('notes__item');
    }
  }

}
