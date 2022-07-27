class Sidebar {
  private SIDEBAR_ELEMENT: HTMLElement | null = document.querySelector('.sidebar');
  private TOGGLE_SIDEBAR_BUTTON: HTMLElement | null = document.querySelector('#toggleSidebar-button');

  constructor() {
    this.TOGGLE_SIDEBAR_BUTTON?.addEventListener('click', this.toggleSidebar);
  }

  private toggleSidebar = (): void => {
    this.SIDEBAR_ELEMENT?.classList.toggle('active');
  };
}

export default Sidebar;
