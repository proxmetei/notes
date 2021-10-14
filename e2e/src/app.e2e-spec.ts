import { AppPage } from './app.po';
import { by, browser, element, logging } from 'protractor';
import {ISection} from '../../src/app/sectm/section/section.interface';
describe('Добавление секции', () => {
  // let page: AppPage;
  const appPage: AppPage = new AppPage();
  beforeAll(() => {
   // page = new AppPage();
   appPage.navigateTo();
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
    expect(appPage.getNameSubmit()?.isEnabled()).toBeFalsy('В форме не задизейблена кнопка submit');
    await appPage.getNameSubmit().click();
    expect(appPage.getSectionModalComponent()?.isPresent()).toBeTruthy('Форма не исчезает');
  });
  it('Модальное окно выглядит правильно работает c вводом данных', async () => {
    await appPage.setName('r1');
    expect(await appPage.getNameFieldValue()).toBe('r1', 'Введленное имя секции не отображается');
    expect(appPage.getNameSubmit()?.isEnabled()).toBeFalsy('В форме задизейблена кнопка submit');
    await appPage.getNameSubmit().click();
    expect(appPage.getSectionModalComponent()?.isPresent()).toBeFalsy('Модальное окно не исчезло');
    element.all(by.tagName('app-section')). then((sections: ISection[]) => {
      expect(sections[sections.length].title).toBe('r1', 'секция с указанным именем не появилась');
   } );
    expect(appPage.getAddSectionButton()?.isPresent).toBeTruthy('Кнопка добавления секции не появилась');
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
