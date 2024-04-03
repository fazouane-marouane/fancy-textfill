export interface FontInfo {
	fontFamily: string;
	lineHeightRatio: number;
	maxLineHeight: number | null;
}

export function fontInfo(
	element: HTMLElement,
	explicitLineHeight: boolean,
): FontInfo {
	const computedStyle = window.getComputedStyle(element);
	const fontFamily = computedStyle.fontFamily;
	const lineHeight = computedStyle.lineHeight;
	let lineHeightRatio: number | null = null;
	let maxLineHeight: number | null = null;
	if (lineHeight && lineHeight !== "normal") {
		const matchs = lineHeight.match(/^(\d+(?:\.?\d+)?)(\w*)$/)!;
		lineHeightRatio = Number.parseFloat(matchs[1]);
		switch (matchs[2]) {
			case "%":
				lineHeightRatio /= 100;
				break;
			case "px":
				if (explicitLineHeight) {
					maxLineHeight = lineHeightRatio;
				}
				lineHeightRatio /= Number.parseFloat(
					(computedStyle.fontSize || element.style.fontSize)!,
				);
				break;
		}
	} else {
		lineHeightRatio = -1;
	}
	return {
		fontFamily,
		lineHeightRatio,
		maxLineHeight,
	};
}
