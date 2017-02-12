define([
  'intern/chai!expect',
  'intern!bdd',
  'dist/fancy-text-fill'
], function (expect, bdd, fancyTextFill) {

  bdd.describe('textfill', function () {
    var optionsTemplates = {
      minFontSize: 6,
      maxFontSize: 26,
      maxWidth: 300,
      maxHeight: 40,
      multiline: false
    };

    bdd.it("final font size should be smaller than maxFontSize", function () {
      var element = document.createElement('span');
      element.innerText = "hey";
      var options = Object.assign({}, optionsTemplates);
      fancyTextFill.fillParentContainer(element, options);
      expect(element.style.fontSize).be.a('string').and.eql('26px');
      options.multiline = true;
      options.maxFontSize = 10;
      fancyTextFill.fillParentContainer(element, options);
      expect(element.style.fontSize).be.a('string').and.eql('10px');
    });
    
    bdd.it("final font size should be bigger than minFontSize", function () {
      var element = document.createElement('span');
      element.innerText = "Chanelthis,Chanelthat,hellyeah.Straightstuntin'yeahwedoitlikethat.Ineedyourstrengthtohandlethepressure.Infectmewithyourloveandfillmewithyourpoison.";
      var options = Object.assign({}, optionsTemplates);
      fancyTextFill.fillParentContainer(element, options);
      expect(element.style.fontSize).be.a('string').and.eql('6px');
      options.minFontSize = 20;
      fancyTextFill.fillParentContainer(element, options);
      expect(element.style.fontSize).be.a('string').and.eql('20px');
    });

    bdd.it("multiline is irrelevant when there's no space in the innerText", function() {
      var element = document.createElement('span');
      element.innerText = "Chanelthis,Chanelthat,hellyeah.Straightstuntin'yeahwedoitlikethat.";
      var options = Object.assign({}, optionsTemplates);
      fancyTextFill.fillParentContainer(element, options);
      var fontSize1 = element.style.fontSize;
      options.multiline = true;
      fancyTextFill.fillParentContainer(element, options);
      var fontSize2 = element.style.fontSize;
      expect(fontSize1).eql(fontSize2);
    });

    bdd.it("multiline make the text bigger", function() {
      var element = document.createElement('span');
      element.innerText = "Chanel this, Chanel that, hell yeah. Straight stuntin' yeah we do it like that.";
      var options = Object.assign({}, optionsTemplates);
      fancyTextFill.fillParentContainer(element, options);
      var fontSize1 = Number.parseInt(element.style.fontSize);
      options.multiline = true;
      fancyTextFill.fillParentContainer(element, options);
      var fontSize2 = Number.parseInt(element.style.fontSize);
      expect(fontSize1).be.below(fontSize2);
    });
  });
});
