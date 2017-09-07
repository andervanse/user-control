import { UserControlPage } from './app.po';

describe('user-control App', () => {
  let page: UserControlPage;

  beforeEach(() => {
    page = new UserControlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
