import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { title } from 'process';
import { SectionService } from '../../../service/section.service';
import { ISection } from '../../section/section.interface';
@Component({
  selector: 'app-modal',
  templateUrl: './modalsection.component.html',
  styleUrls: ['../modal.scss']
})
/**
 * Класс компонента модального окна для секции.
 */
export class ModalsectionComponent implements OnInit {
  iconClose = faTimes;
  idSection: number;
  rename: boolean;
  currTitle: string;

  @Output() submitModal =  new EventEmitter<void>();

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dataService: SectionService) {
    this.myForm = formBuilder.group({
      title: new FormControl('', Validators.required)
    });

  }
  /**
   * Обрабатка события отправки формы. Редактирование и добавление новой секции.
   */
  submitSection(): void {
    if (!this.rename) {
      this.dataService.addSection(this.myForm);
    }
    else {
      console.log( this.idSection);
      this.dataService.findSection(this.idSection).title = this.myForm.value.title;
    }
    this.submitModal.emit();
  }

  ngOnInit(): void {
    if (this.rename) {
      this.myForm.patchValue({
        title: this.currTitle
      });
    }
  }
  }
