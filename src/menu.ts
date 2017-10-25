import { Widgets } from 'blessed';
import { InteractiveCLI } from './interactive-cli';

export interface IMenu {
	new(cli: InteractiveCLI): Menu
}

export class Menu {
	protected widgets: Map<string, Widgets.Node> = new Map();

	constructor(protected cli: InteractiveCLI) {

	}

	protected addWidget(name: string, widget: Widgets.Node) {
		this.widgets.set(name, widget);
	}

	public getWidgets(): Widgets.Node[] {
		let widgets: Widgets.Node[] = [];

		this.widgets.forEach((widget, name) => {
			widgets.push(widget);
		});

		return widgets;
	}

	public destroy() { }
}