import { describe, expect, it } from "vitest";
import * as fancyTextFill from "../../src";

describe("textfill", () => {
	const optionsTemplates = {
		minFontSize: 6,
		maxFontSize: 26,
		maxWidth: 300,
		maxHeight: 40,
		multiline: false,
	};

	it("final font size should be smaller than maxFontSize", () => {
		const element = document.createElement("div");
		element.innerText = "hey";
		const options = Object.assign({}, optionsTemplates);
		fancyTextFill.fillParentContainer(element, options);
		expect(element.style.fontSize).be.a("string").and.eql("26px");
		options.multiline = true;
		options.maxFontSize = 10;
		fancyTextFill.fillParentContainer(element, options);
		expect(element.style.fontSize).be.a("string").and.eql("10px");
	});

	it("final font size should be bigger than minFontSize", () => {
		const element = document.createElement("div");
		element.innerText =
			"Chanelthis,Chanelthat,hellyeah.Straightstuntin'yeahwedoitlikethat.Ineedyourstrengthtohandlethepressure.Infectmewithyourloveandfillmewithyourpoison.";
		const options = Object.assign({}, optionsTemplates);
		fancyTextFill.fillParentContainer(element, options);
		expect(element.style.fontSize).be.a("string").and.eql("6px");
		options.minFontSize = 20;
		fancyTextFill.fillParentContainer(element, options);
		expect(element.style.fontSize).be.a("string").and.eql("20px");
	});

	it("multiline is irrelevant when there's no space in the innerText", () => {
		const element = document.createElement("div");
		element.innerText =
			"Chanelthis,Chanelthat,hellyeah.Straightstuntin'yeahwedoitlikethat.";
		const options = Object.assign({}, optionsTemplates);
		fancyTextFill.fillParentContainer(element, options);
		const fontSize1 = element.style.fontSize;
		options.multiline = true;
		fancyTextFill.fillParentContainer(element, options);
		const fontSize2 = element.style.fontSize;
		expect(fontSize1).eql(fontSize2);
	});

	it("multiline make the text bigger", () => {
		const element = document.createElement("div");
		element.innerText =
			"Chanel this, Chanel that, hell yeah. Straight stuntin' yeah we do it like that.";
		const options = Object.assign({}, optionsTemplates);
		fancyTextFill.fillParentContainer(element, options);
		const fontSize1 = Number.parseInt(element.style.fontSize);
		options.multiline = true;
		fancyTextFill.fillParentContainer(element, options);
		const fontSize2 = Number.parseInt(element.style.fontSize);
		expect(fontSize1).be.below(fontSize2);
	});

	it("numeric line-heights should be handled", () => {
		const element = document.createElement("div");
		document.body.appendChild(element);
		element.style.fontFamily = "Arial";
		element.style.fontSize = "10px";
		element.innerText = "'Cause I am a champion and you’re gonna hear me roar";
		const options = Object.assign({}, optionsTemplates);
		options.maxWidth = 300;
		options.maxHeight = 40;
		options.maxHeight = 10;
		// Case 1
		element.style.lineHeight = "2em";
		fancyTextFill.fillParentContainer(element, options);
		const fontSize1 = Number.parseInt(element.style.fontSize);
		// Case 2
		element.style.lineHeight = "1.2em";
		fancyTextFill.fillParentContainer(element, options);
		const fontSize2 = Number.parseInt(element.style.fontSize);
		// Case 3
		element.style.lineHeight = "1em";
		fancyTextFill.fillParentContainer(element, options);
		const fontSize3 = Number.parseInt(element.style.fontSize);
		// Case 4
		element.style.lineHeight = "normal";
		fancyTextFill.fillParentContainer(element, options);
		const fontSize4 = Number.parseInt(element.style.fontSize);
		// Case 5 idempotence
		element.style.lineHeight = "normal";
		fancyTextFill.fillParentContainer(element, options);
		const fontSize5 = Number.parseInt(element.style.fontSize);
		expect(fontSize1).eql(6);
		expect(fontSize2).eql(8);
		expect(fontSize3).eql(10);
		expect(fontSize4).eql(9);
		expect(fontSize5).eql(9);
		document.body.removeChild(element);
	});
});
