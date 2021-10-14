import { browser, by, element, ElementFinder, ElementArrayFinder, WebElementPromise } from 'protractor';
export class AppPage  {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
  getContainerComponent(): ElementFinder{
    return element(by.tagName('app-container'));
  }
  getSectionModalComponent(): ElementFinder{
    return element(by.tagName('app-modal'));
  }
  getNameField(): ElementFinder{
    return element(by.id('addSectionInput'));
  }
  getNameSubmit(): ElementFinder{
    return element(by.id('addSectionSubmit'));
  }
  getAddSectionButton(): ElementFinder{
    return element(by.name('addSectionButton'));
  }
  getModalSectionText(): ElementFinder{
    return element(by.name('modalSectionText'));
  }
/**
 * Получение имени секции.
 */
  public async getNameFieldValue(): Promise<string>{
    return this.getNameField().getAttribute('value');
  }
/**
 * Добавления заголовка секции.
 */
 public async setName(name: string): Promise<void> {
   await this.getNameField().sendKeys(name);
 }
 getSections(): ElementArrayFinder{
   return element.all(by.tagName('app-section'));
 }
 getTitles(): ElementArrayFinder{
   return element.all(by.name('sectionTitle'));
 }
 getSectionNotes(id: number): ElementArrayFinder
 {
   return element.all(by.id(`${id}`));
 }
 getMenu(e: ElementFinder): ElementFinder
 {
   return e.element(by.name('hiddenMenu'));
 }
 getMenuAddButton(e: ElementFinder): ElementFinder
 {
   return e.element(by.name('settingButton'));
 }
 getNotes(e: ElementFinder): ElementArrayFinder
 {
   return e.all(by.tagName('app-note'));
 }
 getButtonAddNote(e: ElementFinder): ElementFinder
 {
   return e.element(by.name('addNote'));
 }
 getModalForNote(): ElementFinder
 {
   return element(by.tagName('app-modal-note'));
 }
 getInputNoteTitle(): ElementFinder
 {
   return element(by.name('title'));
 }
 getInputNoteText(): ElementFinder
 {
   return element(by.name('text'));
 }
 getInputNoteDate(): ElementFinder
 {
   return element(by.name('dateModal'));
 }
/**
 * Получение заголовка заметки.
 */
 public async getNoteTitleValue(): Promise<string>{
  return this.getInputNoteTitle().getAttribute('value');
}
/**
 * Добавление заголовка заметки.
 */
public async setNoteTitle(name: string): Promise<void> {
 await this.getInputNoteTitle().sendKeys(name);
}
/**
 * Получение даты заметки.
 */
public async getNoteDateValue(): Promise<string>{
  return this.getInputNoteDate().getAttribute('value');
}
/**
 * Добавление даты заметки.
 */
public async setNoteDate(name: string): Promise<void> {
  this.getInputNoteDate().clear();
  await this.getInputNoteDate().sendKeys(name);
}
/**
 * Получение текста заметки.
 */
public async getNoteTitleText(): Promise<string>{
  return this.getInputNoteText().getAttribute('value');
}
/**
 * Добавление текста заметки.
 */
public async setNoteText(name: string): Promise<void> {
 await this.getInputNoteText().sendKeys(name);
}
/**
 * Кнопка добавления заметок.
 */
getSubmitNoteButton(): ElementFinder
{
  return element(by.name('submitNote'));
}
/**
 * Даты заметок.
 */
getNotesDates(e: ElementFinder): ElementArrayFinder
{
 return e.all(by.id('noteDate'));
}
 /**
  * checkbox для четных заметок.
  */
getSectionFilterEven(e: ElementFinder): ElementFinder
{
   return e.element(by.name('date-even'));
}
 /**
  * checkbox для нечетных заметок.
  */
getSectionFilterUneven(e: ElementFinder): ElementFinder
{
  return e.element(by.name('date-uneven'));
}
 /**
  * radio для сортровки начиная старых заметок.
  */
getRadioOld(e: ElementFinder): ElementFinder
{
  return e.element(by.name('sort-old'));
}
/**
 * radio для сортровки начиная с новых заметок.
 */
getRadioNew(e: ElementFinder): ElementFinder
{
  return e.element(by.name('sort-new'));
}
}
