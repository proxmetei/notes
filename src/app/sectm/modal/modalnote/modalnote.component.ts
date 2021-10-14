import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SectionService } from '../../../service/section.service';
import { INote } from '../../note/note.interface';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modalnote.component.html',
  styleUrls: ['../modal.scss']
})
/**
 * Класс компонента модального окна для заметки.
 */
export class ModalnoteComponent implements OnInit {
  iconClose = faTimes;

  sectionId: number;
  noteId: number;
  edit: boolean;
  currNote: INote;

  datePipeString: string;


  @Output() submitModal = new EventEmitter<void>();

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dataService: SectionService) {
    this.myForm = formBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      date: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (!this.edit) {
      this.myForm.patchValue({
        date: new Date()
     });
    }
    else {
      this.myForm.patchValue({
        title:     this.dataService.getNote(this.sectionId, this.noteId).name,
        text:     this.dataService.getNote(this.sectionId, this.noteId).noteText,
        date:     this.dataService.getNote(this.sectionId, this.noteId).date
      });
    }
  }
  /**
   * Обрабатка события отправки формы. Редактирование и добавление новой заметки.
   */
  submitNote(): void {
    if (!this.edit) {
      this.dataService.addNote( {
        subtitle: "",
        sectionId: this.sectionId,
        noteId: this.noteId,
        name: this.myForm.value.title,
        noteText: this.myForm.value.text,
        date: typeof this.myForm.value.noteDate === 'object' ? this.myForm.value.noteDate : new Date(this.myForm.value.date),
        removed: false
      });
    }
    else {
      this.dataService.getNote(this.sectionId, this.noteId).name = this.myForm.value.title;
      this.dataService.getNote(this.sectionId, this.noteId).noteText = this.myForm.value.text;
      this.dataService.getNote(this.sectionId, this.noteId).date = typeof this.myForm.value.noteDate
       === 'object' ? this.myForm.value.date : new Date(this.myForm.value.date);
    }
    this.submitModal.emit();
  }
}
