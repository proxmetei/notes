import { Component, Input, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit, OnChanges } from '@angular/core';

import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { INote } from '../note/note.interface';
import { SectionService } from '../../service/section.service';
import { ISection } from './section.interface';
import { TranslateService } from '@ngx-translate/core';
import { ModalsectionComponent } from '../modal/modalsection/modalsection.component';
import { ModalnoteComponent } from '../modal/modalnote/modalnote.component';

import { Observable, fromEvent, merge, Subject, from, of } from 'rxjs';
import { tap, map, switchMap, mergeAll } from 'rxjs/operators';
import { stringify } from 'querystring';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
/**
 * Класс компонента секции.
 */
export class SectionComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() sectionId: number;
  @Input() addeddNote: INote;
  @Input() sec: Number;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRemoveSection = new EventEmitter<ISection>();
  @Output() Drag = new EventEmitter<number>();
  @Output() MyNote = new EventEmitter<INote>();
  @Output() EndDrag = new EventEmitter<number>();
  @Output() dropNote = new EventEmitter<{ note: INote, sec: Number }>();
  @ViewChild('modalForSection', { read: ViewContainerRef }) containerSection;
  @ViewChild('modalForNote', { read: ViewContainerRef }) containerNote;
  iconProperty = faEllipsisV;
  iconCogs = faCogs;
  iconPlus = faPlus;
  isDisabled = false;
  currSection: ISection;
  notes: INote[] = [];
  idNote = 0;
  even = false;
  uneven = false;
  sortMinToMax = true;
  idInputs = { filterEven: '', filterUneven: '', sortOld: '', sortNew: '', proper: '', menu: '' };
  notes$: Observable<any>;
  myObs$: Observable<any>;
  noteToAdd$(): Observable<INote> {
    return of(this.addeddNote);
  }
  mergeEvents$: Observable<any>;
  mynotes$ = new Subject();
  color = 'springgreen';
  constructor(private dataService: SectionService, private resolver: ComponentFactoryResolver, public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.use('ru');
  }
  ngOnInit(): void {
    this.currSection = this.dataService.findSection(this.sectionId);
    this.setIdInputs();
    console.log(this.idInputs);
    this.notes$ = this.dataService.getAllNotes(this.sectionId).pipe(
      map(value => {
        return this.dataService.sortNotes(this.dataService.getEvenNotes(this.currSection, this.even, this.uneven), this.sortMinToMax);
      }),
    );
    this.notes$.subscribe(
      (value: INote[]) => {
      this.notes = value;
        this.notes = this.dataService.dateSelector(this.dataService.findSection(this.sectionId));
      }
    );
  }
  enableDrag = () => {
    this.Drag.emit(1);
  }
  disableDrag = () => {
    this.EndDrag.emit(1);
  }
  ngAfterViewInit(): void {
    this.mergeEvents$ = merge(
      fromEvent(document.getElementById(`${this.idInputs.filterEven}`), 'click').pipe(tap(() => this.even = !this.even)),
      fromEvent(document.getElementById(`${this.idInputs.filterUneven}`), 'click').pipe(tap(() => this.uneven = !this.uneven)),
      fromEvent(document.getElementById(`${this.idInputs.sortOld}`), 'click').pipe(tap(() => this.sortMinToMax = true)),
      fromEvent(document.getElementById(`${this.idInputs.sortNew}`), 'click').pipe(tap(() => this.sortMinToMax = false)),
    );
    console.log(this.mergeEvents$);
    this.mergeEvents$.pipe(
      switchMap(
        (combine: any) => {
          return this.notes$;
        }
      )
    ).subscribe(
      (value: INote[]) => {
        this.notes = value;
      }
    );
    document.getElementById(`${this.idInputs.proper}`).addEventListener('mousedown', this.enableDrag);
    document.addEventListener('mouseup', this.disableDrag);
  }
  /**
   * Открытие и закрытие всплывающего меню.
   */
  open(): void {
    if (!this.isDisabled) {
      document.getElementById(this.idInputs.menu).classList.remove('disappear');

    }
    else {
      document.getElementById(this.idInputs.menu).classList.add('disappear');

    }
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled);
  }
  /**
   * Установка id для элементов в зависимости от id секции.
   */
  setIdInputs(): void {
    this.idInputs.filterEven = 'filter-even-' + this.sectionId;
    this.idInputs.filterUneven = 'filter-uneven-' + this.sectionId;
    this.idInputs.sortOld = 'sort-old-' + this.sectionId;
    this.idInputs.sortNew = 'sort-new-' + this.sectionId;
    this.idInputs.proper = 'proper' + this.sectionId;
    this.idInputs.menu = 'menu' + this.sectionId;
  }
  /**
   * Создание динамического компонента модального окна для редактирования секции.
   */
  renameSection(): void {
    this.containerSection.clear();
    const modalFactorySection = this.resolver.resolveComponentFactory(ModalsectionComponent);
    const s = this.containerSection.createComponent(modalFactorySection);

    s.instance.idSection = this.sectionId;
    s.instance.rename = true;
    s.instance.currTitle = this.currSection.title;
    s.instance.submitModal.subscribe(() => {
      this.containerSection.clear();
      localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
    });
  }
  removeSection(): void {
    this.onRemoveSection.emit(this.currSection);
  }
  /**
   * Создание динамического компонента модального окна для добавления заметки.
   */
  addNote(): void {
    this.containerNote.clear();
    const modalFactoryNote = this.resolver.resolveComponentFactory(ModalnoteComponent);
    const n = this.containerNote.createComponent(modalFactoryNote);

    n.instance.sectionId = this.sectionId;
    n.instance.noteId = this.idNote++;
    n.instance.edit = false;


    n.instance.submitModal.subscribe(() => {
      this.containerNote.clear();

      this.notes$.subscribe(
        (value: INote[]) => {
          this.notes = value;
          this.notes = this.dataService.dateSelector(this.dataService.findSection(this.sectionId));
          localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
        }
      );
    });
  }
  /**
   * Создание динамического компонента модального окна для изменения заметки.
   */
  changeNote(note: INote): void {
    console.log(0);
    this.containerNote.clear();
    const modalFactoryNote = this.resolver.resolveComponentFactory(ModalnoteComponent);
    const n = this.containerNote.createComponent(modalFactoryNote);

    n.instance.sectionId = this.sectionId;
    n.instance.noteId = note.noteId;
    n.instance.edit = true;
    n.currNote = note;
    console.log(note);

    n.instance.submitModal.subscribe(() => {
      this.containerNote.clear();

      this.notes$.subscribe(
        (value: INote[]) => {
          this.notes = value;
          localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
        }
      );
    });
  }
  /**
   * Создание динамического компонента модального окна для удаления заметки.
   */
  removeNote(note: INote): void {
    this.dataService.deleteNote(note);

    this.notes$.subscribe(
      (value: INote[]) => {
        this.notes = value;
        localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
      }
    );
  }
  drop(event: CdkDragDrop<string[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.dropNote.emit(null);
    } else {
      let sect =parseInt( event.previousContainer.id);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let temp: INote = this.dataService.arrayOfSection.find(s => s.id === parseInt(event.container.id)).arrayOfNotes[event.currentIndex];

      temp.sectionId = this.dataService.arrayOfSection.find(s => s.id === parseInt(event.container.id)).id;

      this.dropNote.emit({ note: temp, sec: sect });
    }
    // else
    // {
    //   let temp : INote = this.dataService.getNote(Number(event.container.id),event.previousIndex)
    //   this.dataService.deleteNote(temp);
    //   temp.noteId=event.currentIndex;
    //   this.dataService.addNote(temp)
    // }

  }
  ngOnChanges() {
    if (this.addeddNote != null && this.addeddNote.sectionId == this.sectionId) {
      console.log(this.addeddNote);
      this.dataService.arrayOfSection.find(s => s.id === this.addeddNote.sectionId).arrayOfNotes.find(n => n.noteId === this.addeddNote.noteId).noteId = this.idNote++;
      this.dataService.checkAll();
      localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
    }
  }
}
