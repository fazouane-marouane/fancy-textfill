import type { AlgorithmParameters } from "./algorithmParameters";
import { getLineHeightRatio } from "./lineHeight";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
ctx.font = "10px Arial,sans-serif";

export function computeWidthHeightRatio(
	fontFamily: string,
	text: string,
): number {
	ctx.font = `10px ${fontFamily}`;
	return ctx.measureText(text).width / 10;
}

export function estimateLinesCount(
	wordRatios: number[],
	args: AlgorithmParameters,
): number {
	const { fontSize, maxWidth } = args;
	let currentLineWidth = 0;
	let lines = 1;
	for (const r of wordRatios) {
		const wordSize = r * fontSize;
		if (wordSize >= maxWidth - 5) {
			return -1;
		}
		if (currentLineWidth + wordSize >= maxWidth - 5) {
			lines++;
			currentLineWidth = 0;
		}
		currentLineWidth += wordSize;
	}
	return lines;
}

export function estimateHeight(
	wordRatios: number[],
	args: AlgorithmParameters,
): number {
	let { fontFamily, fontSize, lineHeightRatio } = args;
	const linesCount = estimateLinesCount(wordRatios, args);
	if (lineHeightRatio < 0) {
		lineHeightRatio = getLineHeightRatio(fontFamily, fontSize);
	}
	const computedHeight = fontSize * linesCount * lineHeightRatio;
	return computedHeight;
}
