import { AppPage } from '../app.po';
import { by, browser, element, logging } from 'protractor';
import {ISection} from '../../../src/app/sectm/section/section.interface';
describe('Добавление секции', () => {
  // let page: AppPage;
  const appPage: AppPage = new AppPage();
  beforeAll( async () => {
   // page = new AppPage();
   await appPage.navigateTo();
  });

  it('Кнопка добавления секции отображается', async () => {
    // expect(page.getTitleText()).toEqual('newnodes app is running!');
    expect(appPage.getAddSectionButton()?.isPresent()).toBeTruthy(
      'Кнопка добавления секции не отображается'
    );
  });
  it('Модальное окно выглядит правильно без ввода данных', async () => {
    await appPage.getAddSectionButton().click();
    expect(appPage.getSectionModalComponent()?.isPresent()).toBeTruthy('Форма не появляется');
    expect(appPage.getNameField()?.isPresent()).toBeTruthy('В форме добавление секции отсутсвует input поле');
    expect(appPage.getNameSubmit()?.isPresent()).toBeTruthy('В форме отсутствует submit');
    expect(await appPage.getModalSectionText().getText()).toBe('Название', 'В форме отсутствует текст "название"');
    expect(await appPage.getNameSubmit()?.isEnabled()).toBeFalsy('В форме не задизейблена кнопка submit');
    await appPage.getNameSubmit().click();
    expect(appPage.getSectionModalComponent()?.isPresent()).toBeTruthy('Форма исчезает');
  });
  it('Модальное окно выглядит правильно работает c вводом данных', async () => {
    await appPage.setName('r1');
    expect(await appPage.getNameFieldValue()).toBe('r1', 'Введленное имя секции не отображается');
    expect(await appPage.getNameSubmit()?.isEnabled()).toBeTruthy('В форме задизейблена кнопка submit');
    await appPage.getNameSubmit().click();
    expect(appPage.getSectionModalComponent()?.isPresent()).toBeFalsy('Модальное окно не исчезло');
    const len = (await appPage.getSections()).length;
    expect(appPage.getSections()?.isPresent()).toBeTruthy('Секции не существуют');
    expect(appPage.getTitles()?.isPresent()).toBeTruthy('заголовков не существует');
    expect(await appPage.getTitles().last().getText()).toBe('r1', 'секция с указанным именем не появилась');
    expect((await appPage.getSections()).length).toBe(len, 'неверное количество секций');
    // expect(await appPage.findLastSectionTitle().getText()).toBe('r1', 'секция с указанным именем не появилась');
    expect(appPage.getAddSectionButton()?.isPresent).toBeTruthy('Кнопка добавления секции не появилась');
  });
  it('Добавление заметки работает', async () => {
    expect(appPage.getSections()?.isPresent()).toBeTruthy('Секции не существуют');
    expect(appPage.getButtonAddNote(await appPage.getSections().last())?.isPresent).toBeTruthy('Кнопка добаления заметки отсутствует');
    await appPage.getButtonAddNote(await appPage.getSections().last()).click();
    expect(await appPage.getModalForNote()?.isPresent()).toBeTruthy('Модальное окно для добавления заметки не появилось');
    expect(await appPage.getInputNoteTitle()?.isPresent()).toBeTruthy('Нет input для заголовка');
    expect(await appPage.getInputNoteText()?.isPresent()).toBeTruthy('Нет input для текста');
    expect(await appPage.getInputNoteDate()?.isPresent()).toBeTruthy('Нет input для даты');
    expect(await appPage.getSubmitNoteButton()?.isPresent()).toBeTruthy('В форме отсутствует submit');
    expect(await appPage.getSubmitNoteButton()?.isEnabled()).toBeFalsy('В форме не задизейблена кнопка submit');
    await appPage.getSubmitNoteButton().click();
    expect(appPage.getModalForNote()?.isPresent()).toBeTruthy('Модальное окно для добавления заметки исчезло');
    await appPage.setNoteTitle('Note1');
    await appPage.setNoteText('Note1 text');
    await appPage.setNoteDate('Fri Nov 13 2020 14:36:29 GMT+0300 (MSK)');
    await appPage.getSubmitNoteButton().click();
    expect(appPage.getModalForNote()?.isPresent()).toBeFalsy('Модальное окно для добавления заметки не исчезло');
    expect(appPage.getNotesDates(await appPage.getSections().last()).last().getText()).toBe('13 Ноября 2020, 14:36', 'заметка с заданной датой не появилась');
  });
  it('Фильтрация работает правильно', async () => {
    expect(appPage.getSections()?.isPresent()).toBeTruthy('Секции не существуют');
    expect(appPage.getButtonAddNote(await appPage.getSections().last())?.isPresent).toBeTruthy('Кнопка добаления заметки отсутствует');
    await appPage.getButtonAddNote(await appPage.getSections().last()).click();
    await appPage.setNoteTitle('Note2');
    await appPage.setNoteText('Note2 text');
    await appPage.setNoteDate('Fri Nov 14 2020 14:36:29 GMT+0300 (MSK)');
    await appPage.getSubmitNoteButton().click();
    browser.sleep(1000);
    expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('14 Ноября 2020, 14:36', 'заметка с заданной датой не появилась');
    expect(appPage.getMenuAddButton(await appPage.getSections().last())?.isPresent()).toBeTruthy('Кнопки добавления меню нет');
    await appPage.getMenuAddButton(await appPage.getSections().last()).click();
    expect(appPage.getMenu(await appPage.getSections().last())?.isPresent).toBeTruthy('Меню не появилось');
    expect(appPage.getSectionFilterEven(appPage.getSections().last())?.isPresent).toBeTruthy('checkbox для четных не появился');
    expect(appPage.getSectionFilterUneven(appPage.getSections().last())?.isPresent).toBeTruthy('checkbox для нечетных не появился');
    await appPage.getSectionFilterUneven(appPage.getSections().last()).click();
    expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с четной датой не исчезла');
    expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с четной датой не исчезла');
    await appPage.getSectionFilterEven(appPage.getSections().last()).click();
    expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с четной датой не появилась');
    expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с нечетной датой не появилась');
    await appPage.getSectionFilterUneven(appPage.getSections().last()).click();
    expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с нечетной датой не исчезла');
    expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с нечетной датой не исчезла');
    await appPage.getSectionFilterEven(appPage.getSections().last()).click();
    expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с четной латой не появилась');
    expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с нечетной датой не появилась');
  });
  it('Сортировка работает правильно', async () => {
   // browser.sleep(1000);
   expect(appPage.getRadioOld(appPage.getSections().last())?.isPresent()).toBeTruthy('radio1 отсутствует');
   expect(appPage.getRadioNew(appPage.getSections().last())?.isPresent()).toBeTruthy('radio2 отсутствует');
   await appPage.getRadioNew(appPage.getSections().last()).click();
   expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с более новой датой не на своем месте');
   expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с более старой датой не на сврем месте');
   await appPage.getRadioOld(appPage.getSections().last()).click();
   expect(await appPage.getNotesDates(appPage.getSections().last()).last().getText()).toBe('14 Ноября 2020, 14:36', 'Заметка с более старой датой не на своем месте');
   expect(await appPage.getNotesDates(appPage.getSections().last()).first().getText()).toBe('13 Ноября 2020, 14:36', 'Заметка с более новой датой не на сврем месте');
  });
});
