import { widget, Widgets } from 'blessed';

export class ArtWidget extends widget.Box {
	private art: widget.Text;
	private text: widget.Text;

	constructor(options: Widgets.BoxOptions) {
		super(options);
		
		let artColor = options["artColor"];

		this.art = new widget.Text({
			width: "shrink",
			height: "shrink",
			left: "center",
			top: 0,
			fg: artColor || "white"
		});

		this.text = new widget.Text({
			width: "shrink",
			height: 1,
			left: "center",
			bottom: 0
		});

		this.append(this.art);
		this.append(this.text);
	}


	protected setArt(art: string) {
		this.art.setText(art);
	}

	public setText(text: string) {
		this.text.setText(text);
	}
}