import { TodoItem } from './../models/todo-item';
import { HistoryAction } from './../models/history-action';
import { HistoryActionService } from './history-action.service';
import { TodoSection } from './../models/todo-section';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class LocalTodoService {
  sections: TodoSection[] = [];

  constructor(
    private storage: Storage,
    private historyActionService: HistoryActionService
  ) {
    this.loadData();
  }

  addSection(sectionName: string) {
    this.sections.push(new TodoSection({ title: sectionName }));

    this.historyActionService.addAction(new HistoryAction({
      title: `Added section ${sectionName}`
    }));
    this.saveData();
  }

  removeSection(section: TodoSection) {
    this.sections = this.sections
      .filter(localSection => !Object.is(section, localSection));

    this.historyActionService.addAction(new HistoryAction({
      title: `Removed section ${section.title}`
    }));
    this.saveData();
  }

  addItemToSection(section: TodoSection, item: TodoItem) {
    section.addItem(item);

    this.historyActionService.addAction(new HistoryAction({
      title: `Added item ${item.title} to section ${section.title}`
    }));
    this.saveData();
  }

  removeItemFromSection(section: TodoSection, item: TodoItem) {
    section.removeItem(item);

    this.historyActionService.addAction(new HistoryAction({
      title: `Removed item ${item.title} from section ${section.title}`
    }));
    this.saveData();
  }

  toggleItem(item: TodoItem) {
    item.toggle();

    this.historyActionService.addAction(new HistoryAction({
      title: `Toggled item ${item.title} to ${item.status}`
    }));
    this.saveData();
  }

  updateItemTitle(item: TodoItem, title: string) {
    item.title = title;

    this.historyActionService.addAction(new HistoryAction({
      title: `Updated item to ${item.title}`
    }));
    this.saveData();
  }

  updateSectionTitle(section: TodoSection, title: string) {
    section.title = title;

    this.historyActionService.addAction(new HistoryAction({
      title: `Updated section to ${section.title}`
    }));
    this.saveData();
  }

  loadData() {
    this.storage.get('todo')
      .then(sections => this.sections = sections);
  }

  saveData() {
    this.storage.set('todo', this.sections);
  }

}
