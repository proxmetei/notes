
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ModalsectionComponent } from '../sectm/modal/modalsection/modalsection.component';
import { SectionService } from '../service/section.service';
import { ISection } from '../sectm/section/section.interface';
import { faOtter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { INote } from '../sectm/note/note.interface';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  iconPlus = faPlus;
  private subscription: Subscription;
  sections: ISection[] = [];
  caDrag: boolean[] = [];
  sectionId = 0;
  addedNote: INote= null;
  date: number = null;
  sec: number = null;
  @ViewChild('modalForSection', { read: ViewContainerRef }) container;

  constructor(private dataService: SectionService, private resolver: ComponentFactoryResolver, private activateRoute: ActivatedRoute) {
    this.subscription = this.activateRoute.params.subscribe(params => {
      console.log(params.data);
      this.date = Number(params.data);
      console.log(this.date);
      if (this.date) {
        this.dataService.setDate(this.date);
      }
    });
    this.dataService.getAllSections().subscribe(value => {
      this.sections = value;
      for (const sect of this.sections) {
        this.caDrag.push(true);
      }
      console.log(this.sections);
    });
  }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('sections')));
    if (localStorage.getItem('sections')) {
      this.dataService.loadSections(JSON.parse(localStorage.getItem('sections')).array);
      this.sections = this.dataService.arrayOfSection;
      if (this.sections.length > 0) {
        this.sectionId = this.sections[this.sections.length - 1].id;
      }
      for (const sect of this.sections) {
        this.caDrag.push(true);
      }
      console.log(this.dataService.arrayOfSection);
    }
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.dataService.arrayOfSection = this.sections;
    localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
  }
  dropNote(event): void {
    if(event!=null)
    {
      this.addedNote=event.note;
      this.sec=event.sec;
      this.addedNote = Object.assign({}, this.addedNote);
    }

    this.dataService.arrayOfSection = this.sections;
    localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
  }
  addSection(): void {
    this.container.clear();
    const modalFactory = this.resolver.resolveComponentFactory(ModalsectionComponent);
    const component = this.container.createComponent(modalFactory);

    component.instance.idSection = this.sectionId++;
    component.instance.rename = false;
    component.instance.submitModal.subscribe(() => {
      this.container.clear();
      console.log(this.sections);
    });
  }

  removeSection(id: number): void {
    this.dataService.deleteSection(id);
    localStorage.setItem('sections', JSON.stringify({ array: this.dataService.arrayOfSection }));
    console.log(this.sections);
  }
/**
 * Позволяет перетаскивать секции.
 */
  letDrag(i: number): void {
    console.log('Drag');
    this.caDrag[i] = false;
  }
/**
 * Запрещает перетаскивать секции.
 */
  stopDrag(i: number): void {
    console.log('Stop');
    this.caDrag[i] = true;
  }
}
