import { widget } from 'blessed';
import { WelcomeMenu } from './menu/welcome.menu';
import { IMenu, Menu } from './menu';

const ENTRY_MENU = WelcomeMenu;
export type Listener = () => void;

export class InteractiveCLI {
	private screen: widget.Screen;
	private currentMenu: Menu;
	private currentMenuListeners: Map<string, Listener[]> = new Map();
	private currentIntervalTimers: any[] = [];

	constructor() {
		this.screen = new widget.Screen({
			smartCSR: true
		});

		this.screen.key(['escape', 'C-c'], function(ch, key) {
			return process.exit(0);
		});

		this.useMenu(ENTRY_MENU);
	}

	private clearScreen() {
		for (let child of this.screen.children) {
			this.screen.remove(child);
		}
	}

	private clearListeners() {
		this.currentMenuListeners.forEach((listeners, type) => {
			for (let listener of listeners) {
				this.screen.removeListener(type, listener);
			}
		});

		this.currentMenuListeners = new Map();
	}

	private clearIntervals() {
		for (let timer of this.currentIntervalTimers) {
			clearInterval(timer);
		}
		this.currentIntervalTimers = [];
	}

	private clearMenuState() {
		this.clearScreen();
		this.clearListeners();
		this.clearIntervals();
	}

	public useMenu(menu: IMenu) {
		this.clearMenuState();
		if (this.currentMenu) {
			this.currentMenu.destroy();
			this.currentMenu = null;
		}

		this.currentMenu = new menu(this);
		for (let widget of this.currentMenu.getWidgets()) {
			this.screen.append(widget);
		}

		this.screen.render();
	}

	private registerListener(type: string, listener: Listener) {
		let listenerArray = this.currentMenuListeners.get(type);
		if (!listenerArray) {
			listenerArray = []
		}

		listenerArray.push(listener);
		this.currentMenuListeners.set(type, listenerArray);
	}

	public key(keys: string[], listener: Listener) {
		let renderListener = () => {
			listener();
			this.render();
		}

		this.screen.key(keys, renderListener);
		this.registerListener("key", renderListener);
	}

	public setInterval(callback: Function, interval: number) {
		let renderCallback = () => {
			callback();
			this.render();
		}

		this.currentIntervalTimers.push(setInterval(renderCallback, interval));
	}

	public render() {
		this.screen.render();
	}
}